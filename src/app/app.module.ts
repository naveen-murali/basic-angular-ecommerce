import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { CartComponent } from './screens/cart/cart.component';
import { SigninComponent } from './screens/signin/signin.component';
import { SignupComponent } from './screens/signup/signup.component';
import { RatingComponent } from './components/rating/rating.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WishlistComponent } from './screens/wishlist/wishlist.component';
import { ProductComponent } from './components/product/product.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { CarousalComponent } from './components/carousal/carousal.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { ProductDetailsComponent } from './screens/product-details/product-details.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { HeaderInterceptorService } from './services/interceptors/header-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    SigninComponent,
    SignupComponent,
    RatingComponent,
    ProductDetailsComponent,
    ProductImageComponent,
    NotFoundComponent,
    ProductReviewComponent,
    DialogBoxComponent,
    WishlistComponent,
    CarousalComponent,
    CartComponent,
    CartCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    CarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
