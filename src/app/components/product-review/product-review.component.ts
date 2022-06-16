import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductReviewModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss'],
})
export class ProductReviewComponent implements OnInit, OnDestroy {
  @Input() public review = {} as ProductReviewModel;
  @Input() public reviewId = '' as string;

  @Output() public deleteReview = new EventEmitter();

  private _sub = null as Subscription | null;
  public canEdit = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.review._id === this.reviewId && (this.canEdit = true);
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { content: 'Do you want to delete this review?' },
    });

    this._sub = dialogRef
      .afterClosed()
      .subscribe((result) => result && this.deleteReview.emit());
  }

  ngOnDestroy(): void {
    this._sub && this._sub.unsubscribe();
  }
}
