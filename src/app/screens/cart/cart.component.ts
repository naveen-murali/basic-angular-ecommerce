import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cart = {} as CartModel;

  constructor(public readonly _cartService: CartService) {}

  ngOnInit(): void {}
}
