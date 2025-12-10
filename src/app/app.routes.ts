import { Routes } from '@angular/router';
import { LoginOwnerComponent } from './pages/login-owner/login-owner';
import { RegisterPage } from './pages/register-client/register-client';
import { MenuRestaurantPage } from './pages/menu-restaurant/menu-restaurant';
import { NewProductPage } from './pages/new-product/new-product';
import { RestaurantMenuPage } from './pages/restaurant-page/restaurant-page';
import { Categories } from './pages/categories/categories';
import { Profile } from './pages/profile/profile';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';
import { authGuard } from './guard/auth-guard';
import { publicGuard } from './guard/public-guard';


export const routes: Routes = [
  {
    path: '',
    component: RestaurantMenuPage,
    canActivate: [publicGuard]
  },
  {
    path: 'login-owner',
    component: LoginOwnerComponent,
    canActivate: [authGuard]
  },
  {
    path: 'menu/:id',
    component: MenuRestaurantPage
  },
  {
    path: 'register-client',
    component: RegisterPage,
    canActivate: [authGuard]
  },
  {
    path: 'restaurant-page',
    component: RestaurantMenuPage
  },
  {
    path: 'new-product/:id',
    component: NewProductPage
  },
  {
    path: 'edit-product/:id',
    component: NewProductPage
  },
  {
    path: 'categories',
    component: Categories
  },
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'product-detail/:id',
    component: ProductDetail
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
  
];