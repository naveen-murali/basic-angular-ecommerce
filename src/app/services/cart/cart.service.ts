import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from 'src/app/enums';
import { LoadService } from '../load/load.service';
import { CartModel } from 'src/app/models/cart.model';
import { AlertsService } from '../alerts/alerts.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public CART_API = `${API.BASE}/users/cart`;

  public cartCount = 0;
  public cart = {} as CartModel;

  constructor(
    private readonly _http: HttpClient,
    private readonly _alertService: AlertsService,
    private readonly _loadService: LoadService
  ) {}

  setCartItems(data: CartModel) {
    this.cartCount = data.cartItems?.length || 0;
    this.cart = data;
  }

  getCartItems() {
    !this.cart._id && this._loadService.setShowLoading(true);

    const cart = this._http.get<CartModel>(this.CART_API);
    cart.forEach((data) => {
      this._loadService.setShowLoading(false);
      this.setCartItems(data);
    });
    return cart;
  }

  addToCart(id: string, qty: number = 1) {
    this._loadService.setShowLoading(true);
    this._http
      .post<CartModel>(
        this.CART_API,
        { productId: id, quantity: qty },
        { headers }
      )
      .subscribe({
        next: (_data) => {
          this._loadService.setShowLoading(false);
          this._alertService.setSuccessAlert('One item is added to cart');
          this.getCartItems();
        },
        error: (err: HttpErrorResponse) => {
          this._loadService.setShowLoading(false);
          this._alertService.setErrorAlert(err.error.message);
        },
      });
  }

  removeFromCart(id: string) {
    this._loadService.setShowLoading(true);
    this._http.delete(this.CART_API, { params: { productId: id } }).subscribe({
      next: () => {
        this._loadService.setShowLoading(false);
        this.getCartItems();
      },
      error: (err: HttpErrorResponse) => {
        this._loadService.setShowLoading(false);
        this._alertService.setErrorAlert(err.error.message);
      },
    });
  }

  reset() {
    this.setCartItems({} as CartModel);
  }
}
