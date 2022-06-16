import { Component, Input, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() public product = {} as ProductModel;

  public isProductInWishList = false;

  constructor(
    private readonly _wishlistService: WishlistService,
    private readonly _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isProductInWishList = this._wishlistService.wishlistObj[
      this.product._id
    ]
      ? true
      : false;
  }

  toWishList() {
    if (this.isProductInWishList) {
      this._wishlistService.removeFromWishList(this.product._id);
    } else {
      this._wishlistService.addToWishlist(this.product._id);
    }

    this.isProductInWishList = !this.isProductInWishList;
  }

  addToCart() {
    this._cartService.addToCart(this.product._id);
  }
}
