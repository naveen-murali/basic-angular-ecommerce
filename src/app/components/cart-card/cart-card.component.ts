import { Component, Input, OnInit } from '@angular/core';
import { CartItemsModel } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent implements OnInit {
  @Input() public item = {} as CartItemsModel;

  public quantity = 0;

  constructor(private readonly _cartService: CartService) {}

  ngOnInit(): void {
    this.quantity = this.item.quantity;
  }

  getCount(count: number) {
    return new Array(count);
  }

  removeFormCart() {
    this._cartService.removeFromCart(this.item.product._id);
  }

  addToCart() {
    this._cartService.addToCart(this.item.product._id, this.quantity);
  }
}
