export interface CarousalDataModal {
  _id: string;
  name: string;
  image: string[];
  brand: {
    _id: string;
    name: string;
  };
  description: string;
  rating: number;
  numReviews: number;
  discount: number;
  price: number;
  countInStock: number;
}
