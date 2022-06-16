import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteEnum } from './enums';
import { CartComponent } from './screens/cart/cart.component';
import { HomeComponent } from './screens/home/home.component';
import { SigninComponent } from './screens/signin/signin.component';
import { SignupComponent } from './screens/signup/signup.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { WishlistComponent } from './screens/wishlist/wishlist.component';
import { CartResolverService } from './services/cart/cart-resolver.service';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { ProductResolveService } from './services/product/product-resolve.service';
import { CarousalResolverService } from './services/carousal/carousal-resolver.service';
import { WishlistResolverService } from './services/wishlist/wishlist-resolver.service';
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { ProductDetailsResolveService } from './services/product/product-details-resolve.service';

const routes: Routes = [
  { path: RouteEnum.ROOT, redirectTo: RouteEnum.HOME, pathMatch: 'full' },
  {
    path: RouteEnum.HOME,
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: {
      products: ProductResolveService,
      wishlist: WishlistResolverService,
      carousal: CarousalResolverService,
      cart: CartResolverService,
    },
  },
  {
    path: `${RouteEnum.PRODUCT}/:id`,
    component: ProductDetailsComponent,
    canActivate: [AuthGuardService],
    resolve: { productDetails: ProductDetailsResolveService },
  },
  {
    path: RouteEnum.WISHLIST,
    component: WishlistComponent,
    canActivate: [AuthGuardService],
    resolve: { wishlist: WishlistResolverService },
  },
  {
    path: RouteEnum.CART,
    component: CartComponent,
    canActivate: [AuthGuardService],
    resolve: { cart: CartResolverService },
  },
  {
    path: RouteEnum.SIGNIN,
    canActivate: [AuthGuardService],
    component: SigninComponent,
  },
  {
    path: RouteEnum.SIGNUP,
    canActivate: [AuthGuardService],
    component: SignupComponent,
  },
  {
    path: RouteEnum.WILDCARD,
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
