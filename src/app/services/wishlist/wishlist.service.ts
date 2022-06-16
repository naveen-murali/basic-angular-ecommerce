import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API } from 'src/app/enums';
import { LoadService } from '../load/load.service';
import { AlertsService } from '../alerts/alerts.service';
import { WishlistModel, WishlistObjModel } from 'src/app/models/wishlist.model';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private WISHLIST_API = `${API.BASE}/users/wishlists`;
  public wishlistLength = 0;
  public wishlistObj = {} as WishlistObjModel;

  constructor(
    private readonly _http: HttpClient,
    private readonly _loadService: LoadService,
    private readonly _alertService: AlertsService
  ) {}

  addToWishlist(id: string) {
    this._loadService.setShowLoading(true);

    this._http
      .put<WishlistModel[]>(this.WISHLIST_API, { id }, { headers })
      .subscribe({
        next: () => {
          this._loadService.setShowLoading(false);
          this.getAllwishlist();
          this._alertService.setSuccessAlert('Item is added to wishlist');
        },
        error: (err: HttpErrorResponse) => {
          this._loadService.setShowLoading(false);
          this._alertService.setErrorAlert(err.error.message);
        },
      });
  }

  removeFromWishList(id: string) {
    this._loadService.setShowLoading(true);

    this._http.delete(`${this.WISHLIST_API}?id=${id}`).subscribe({
      next: () => {
        this._loadService.setShowLoading(false);
        this.getAllwishlist();
      },
      error: (err: HttpErrorResponse) => {
        this._loadService.setShowLoading(false);
        this._alertService.setErrorAlert(err.error.message);
      },
    });
  }

  getAllwishlist() {
    !this.wishlistLength && this._loadService.setShowLoading(true);

    const list = this._http.get<WishlistModel[]>(this.WISHLIST_API);
    list.forEach((data) => {
      this._loadService.setShowLoading(false);

      this.wishlistLength = data.length;

      const value = data.reduce((acc, value) => {
        acc[value._id] = value;
        return acc;
      }, {} as WishlistObjModel);

      this.wishlistObj = value;
    });
    return list;
  }

  reset() {
    this.wishlistLength = 0;
    this.wishlistObj = {} as WishlistObjModel;
  }
}
