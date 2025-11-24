import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { LoginOwnerComponent } from './pages/login-owner/login-owner';
import { LoginPage } from './pages/login-client/login-client';
import { RegisterPage } from './pages/register-client/register-client';
import { MenuRestaurantPage } from './pages/menu-restaurant/menu-restaurant';
import { NewProductPage } from './pages/new-product/new-product';
import { RestaurantMenuPage } from './pages/restaurant-page/restaurant-page';
import { Categories } from './pages/categories/categories';
import { Profile } from './pages/profile/profile';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';


export const routes: Routes = [
  {
    path: 'main',
    component: MainPage
  },
  {
    path: 'login-owner',
    component: LoginOwnerComponent
  },
  {
    path: 'menu/:id',
    component: MenuRestaurantPage
  },
  {
    path: 'login-client',
    component: LoginPage   
  },
  {
    path: 'register-client',
    component: RegisterPage
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