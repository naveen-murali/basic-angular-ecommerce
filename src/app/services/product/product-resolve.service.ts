import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';

import { ProductService } from './product.service';
import { ProductResModel } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductResolveService
  implements Resolve<ProductResModel | never | boolean>
{
  constructor(private readonly productService: ProductService) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<ProductResModel> | Observable<never> | boolean {
    let length = this.productService.products.length;

    const productResolve = this.productService
      .getProducts()
      .pipe(catchError(this.productService.handleError));

    if (!length) {
      return productResolve;
    } else {
      return true;
    }
  }
}
