import { ProductModel } from './product.model';

export interface WishlistModel extends ProductModel {}

export interface WishlistObjModel {
  [id: string]: WishlistModel;
}
