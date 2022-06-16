export interface ProductModel {
  _id: string;
  name: string;
  image: string[];
  brand: {
    name: string;
  };
  price: number;
  rating: number;
  numReviews: number;
}

export interface ProductResModel {
  page: number;
  pages: number;
  products: ProductModel[];
}

export interface ProductReviewModel {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddReviewModel
  extends Pick<ProductDetailsModel, 'rating' & 'comment'> {}

export interface ProductDetailsModel {
  _id: string;
  user: string;
  name: string;
  image: string[];
  brand: {
    name: string;
  };
  description: string;
  rating: number;
  numReviews: number;
  discount: number;
  price: number;
  countInStock: number;
  reviews: ProductReviewModel[];
}