import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { WishlistService } from './wishlist.service';
import { WishlistModel } from 'src/app/models/wishlist.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistResolverService
  implements Resolve<WishlistModel[] | boolean>
{
  constructor(private readonly wishlistService: WishlistService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    let length = this.wishlistService.wishlistLength;

    const wishlistResolve = this.wishlistService
      .getAllwishlist()
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => err.error.message)
        )
      );

    if (length) return true;

    return wishlistResolve;
  }
}
