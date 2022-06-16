import { Component, OnInit } from '@angular/core';
import { WishlistObjModel } from 'src/app/models/wishlist.model';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  constructor(public readonly _wishlistService: WishlistService) {}

  ngOnInit(): void {}

  removeToWishList(id: string) {
    this._wishlistService.removeFromWishList(id);
  }
}
