export interface UserDetailsModel {
  _id: string;
  name: string;
  phone: string;
  email: string;
  wallet: number;
  address: {
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    contry: string;
    _id: string;
  }[];
  isAdmin: boolean;
  googleId: string;
  referralNum: number;
  wishlistCount: number;
  token: string;
}

export interface SigninModel {
  email: string;
  password: string;
}

export interface SignupModel {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export type AuthSuccessCBModel = (data: UserDetailsModel) => void;
export type AuthErrorCBModel = (error: string) => void;
