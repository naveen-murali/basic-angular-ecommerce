import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from '../../enums/api.enum';
import { StorageEnum } from '../../enums/storage.enum';
import {
  AuthErrorCBModel,
  AuthSuccessCBModel,
  SigninModel,
  SignupModel,
  UserDetailsModel,
} from 'src/app/models/auth.model';
import { InterceptHeaders } from 'src/app/enums/http.enum';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  [`${InterceptHeaders.SKIP}`]: 'true',
});

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SIGNIN_URL = `${API.BASE}/users/login`;
  private readonly SIGNUP_URL = `${API.BASE}/users`;

  public userDetails = {} as UserDetailsModel;

  constructor(
    private readonly _wishlistService: WishlistService,
    private readonly _cartService: CartService,
    private readonly _http: HttpClient
  ) {
    this.getUserDetailsFromLocal();
  }

  private getUserDetailsFromLocal() {
    const userDetails = localStorage.getItem(StorageEnum.USER);
    userDetails &&
      (this.userDetails = <UserDetailsModel>JSON.parse(userDetails));
  }

  logout(cb: () => void) {
    this.userDetails = {} as UserDetailsModel;
    localStorage.removeItem(StorageEnum.USER);

    cb();
    this._wishlistService.reset();
    this._cartService.reset();
  }

  signin(
    signinData: SigninModel,
    successCB: AuthSuccessCBModel,
    errorCB: AuthErrorCBModel
  ) {
    this._http
      .post<UserDetailsModel>(this.SIGNIN_URL, signinData, { headers })
      .subscribe({
        next: (data) => {
          this.addUserDetails(data);
          successCB(data);
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error.message;
          errorCB(errorMessage);
        },
      });
  }

  signup(
    signupData: SignupModel,
    successCB: AuthSuccessCBModel,
    errorCB: AuthErrorCBModel
  ) {
    this._http
      .post<UserDetailsModel>(this.SIGNUP_URL, signupData, { headers })
      .subscribe({
        next: (data) => {
          this.addUserDetails(data);
          successCB(data);
        },
        error: (err: HttpErrorResponse) => {
          const errorMessage = err.error.message;
          errorCB(errorMessage);
        },
      });
  }

  addUserDetails(data: UserDetailsModel) {
    localStorage.setItem(StorageEnum.USER, JSON.stringify(data));
    this.userDetails = data;
  }
}
