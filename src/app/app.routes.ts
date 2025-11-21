import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { LoginOwnerComponent } from './pages/login-owner/login-owner';
import { LoginPage } from './pages/login-client/login-client';
import { RegisterPage } from './pages/register-client/register-client';
import { MenuRestaurantPage } from './pages/menu-restaurant/menu-restaurant';
import { NewProduct } from './pages/new-product/new-product';
export const routes: Routes = [
  {
    path: '',
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'new-product/:id',
    component: NewProduct
  }
  
];