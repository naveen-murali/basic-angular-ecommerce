import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

import {
  ProductModel,
  AddReviewModel,
  ProductResModel,
  ProductDetailsModel,
} from '../../models/product.model';
import { API } from '../../enums/api.enum';
import { LoadService } from '../load/load.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly PRODUCTS_API = `${API.BASE}/products`;
  private readonly PRODUCTS_DETAILS_API = `${API.BASE}/products`;
  private PRODUCTS_REVIEW_API = (id: string) => {
    return `${API.BASE}/products/${id}/reviews`;
  };
  private DELETE_PRODUCTS_REVIEW_API = (id: string, reviewId: string) => {
    return `${API.BASE}/products/${id}/reviews/${reviewId}`;
  };

  public products = [] as ProductModel[];

  constructor(
    private readonly _http: HttpClient,
    private readonly _loadService: LoadService
  ) {}

  getProducts = () => {
    !this.products.length && this._loadService.setShowLoading(true);

    const productObs = this._http.get<ProductResModel>(this.PRODUCTS_API);

    productObs.forEach((data) => {
      this._loadService.setShowLoading(false);
      this.products = data.products;
    });

    return productObs;
  };

  getProductDetails(id: string) {
    return this._http.get<ProductDetailsModel>(
      `${this.PRODUCTS_DETAILS_API}/${id}`
    );
  }

  addReviewProduct(id: string, review: AddReviewModel) {
    return this._http.put<ProductDetailsModel>(
      this.PRODUCTS_REVIEW_API(id),
      review,
      { headers }
    );
  }

  deleteReviewProduct(id: string, reviewId: string) {
    return this._http.put<ProductDetailsModel>(
      this.DELETE_PRODUCTS_REVIEW_API(id, reviewId),
      {},
      { headers }
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(() => err.error.message);
  }

  getErrorMessage(err: HttpErrorResponse) {
    return err.error.message;
  }
}
