import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';

import { ProductDetailsModel } from 'src/app/models/product.model';
import { LoadService } from '../load/load.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsResolveService
  implements Resolve<ProductDetailsModel>
{
  constructor(
    private readonly productService: ProductService,
    private readonly _laodService: LoadService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<ProductDetailsModel> | never {
    const id = route.paramMap.get('id');

    this._laodService.setShowLoading(true);

    return this.productService
      .getProductDetails(id as string)
      .pipe(catchError(this.productService.handleError));
  }
}
