import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { RouteEnum } from 'src/app/enums';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoadService } from 'src/app/services/load/load.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _subs = [] as Subscription[];

  constructor(
    public readonly _authService: AuthService,
    public readonly _loadService: LoadService,
    public readonly _cartSerivice: CartService,
    public readonly _wishlistSerivce: WishlistService,

    private readonly _router: Router
  ) {}

  logout() {
    this._authService.logout(() => this._router.navigate([RouteEnum.SIGNIN]));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }
}
