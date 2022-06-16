import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { CartModel } from 'src/app/models/cart.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartResolverService
  implements Resolve<CartModel | boolean | never>
{
  constructor(private readonly _cartService: CartService) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    let count = this._cartService.cartCount;

    const cartResolve = this._cartService
      .getCartItems()
      .pipe(
        catchError((err: HttpErrorResponse) =>
          throwError(() => err.error.message)
        )
      );

    if (count) return true;

    return cartResolve;
  }
}
