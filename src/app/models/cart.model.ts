export interface CartItemsModel {
  product: {
    _id: string;
    name: string;
    image: string[];
    rating: number;
    numReviews: number;
    countInStock: number;
  };
  quantity: number;
  price: number;
}

export interface CartModel {
  _id: string;
  cartItems: CartItemsModel[];
  price: number;
}

export const CartItems = {
  _id: '62a6cea4676ac18990b20731',
  user: '620946573df2695996e4adb6',
  cartItems: [
    {
      product: {
        _id: '6204a5af1e8090b4ab3d9d07',
        name: 'OnePlus 9RT 5G',
        image: [
          'https://unityshop.s3.amazonaws.com/image-1644471725164.jpeg',
          'https://unityshop.s3.amazonaws.com/image-1644471725160.jpeg',
          'https://unityshop.s3.amazonaws.com/image-1644471725133.jpeg',
        ],
        rating: 4.666666666666667,
        numReviews: 3,
        countInStock: 18,
      },
      quantity: 1,
      price: 47000,
    },
    {
      product: {
        _id: '61ff73e3550fd28cacef5d7b',
        name: 'Vivo Y51A',
        image: [
          'https://unityshop.s3.ap-south-1.amazonaws.com/image-1644468269154.jpeg',
          'https://unityshop.s3.ap-south-1.amazonaws.com/image-1644468269166.jpeg',
          'https://unityshop.s3.ap-south-1.amazonaws.com/image-1644468269159.jpeg',
        ],
        rating: 5,
        numReviews: 1,
        countInStock: 10,
      },
      quantity: 2,
      price: 15000,
    },
  ],
  price: 77000,
  createdAt: '2022-06-13T05:44:04.184Z',
  updatedAt: '2022-06-13T05:45:19.477Z',
  __v: 6,
};
