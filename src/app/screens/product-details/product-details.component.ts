import { Subscription } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoadService } from 'src/app/services/load/load.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private _id = '' as string | null;
  private _subs = [] as Subscription[];

  public product = {} as ProductDetailsModel;
  public isReviewed = false as boolean;
  public currentImgUrl = '' as string;
  public reviewId = '' as string;
  public ratings = [
    { value: 5, content: '5 - Exelent' },
    { value: 4, content: '4 - Very Good' },
    { value: 3, content: '3 - Good' },
    { value: 2, content: '2 - Fair' },
    { value: 1, content: '1 - Poor' },
  ];

  public ratingForm = this._fb.group({
    rating: ['', [Validators.required]],
    comment: [''],
  });

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1280: {
        items: 5,
      },
    },
    nav: true,
  };

  constructor(
    public readonly _productService: ProductService,
    public readonly _authService: AuthService,
    private readonly _alertService: AlertsService,
    private readonly _loadService: LoadService,
    private readonly _fb: FormBuilder,
    private readonly _activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._id = this._activeRouter.snapshot.paramMap.get('id');

    !this._productService.products.length && this._productService.getProducts();

    const sub = this._activeRouter.data.subscribe((data: any) => {
      this._loadService.setShowLoading(false);
      this.setProduct(data.productDetails as ProductDetailsModel);
    });

    this._subs.push(sub);
  }

  getCount(count: number) {
    return new Array(count);
  }

  submitRating() {
    if (!this._id)
      return this._alertService.setErrorAlert('Product Id is missing');

    this._loadService.setShowLoading(true);
    this._productService
      .addReviewProduct(this._id, this.ratingForm.value)
      .subscribe({
        next: (data) => {
          this.reviewSuccess(data);
          this.ratingForm.reset();
        },
        error: this.reviewError.bind(this),
      });
  }

  deleteReview() {
    if (!this._id)
      return this._alertService.setErrorAlert('product id is missing');

    this._loadService.setShowLoading(true);

    this._productService
      .deleteReviewProduct(this._id, this.reviewId)
      .subscribe({
        next: this.reviewSuccess.bind(this),
        error: this.reviewError.bind(this),
      });
  }

  reviewSuccess(data: ProductDetailsModel) {
    this._loadService.setShowLoading(false);
    this.setProduct(data);
  }
  reviewError(err: HttpErrorResponse) {
    this._loadService.setShowLoading(false);
    this._alertService.setErrorAlert(this._productService.getErrorMessage(err));
  }

  setProduct(data: ProductDetailsModel) {
    this.product = data;

    const review = data.reviews.find(
      (review) => review.user === this._authService.userDetails._id
    );

    if (review) {
      this.isReviewed = true;
      this.reviewId = review._id;
    } else {
      this.isReviewed = false;
      this.reviewId = '';
    }
  }

  ngOnDestroy(): void {
    this._subs.length && this._subs.forEach((sub) => sub.unsubscribe());
  }
}
