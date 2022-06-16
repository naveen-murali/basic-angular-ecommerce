import { ProductDetailsModel } from './product.model';

export interface HandleObjModel {
  next: (data: ProductDetailsModel) => void;
  error: (err: string) => void;
}
