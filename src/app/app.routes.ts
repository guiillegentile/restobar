import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { LoginOwner } from './pages/login-owner/login-owner';
import { LoginClient } from './pages/login-client/login-client';
import { RegisterClient } from './pages/register-client/register-client';
import { LoginOwner} from './pages/login-owner/login-owner';
import { MenuRestaurantPage } from './pages/menu-restaurant/menu-restaurant';

export const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'login-owner',
    component: LoginOwner
  },
  {
    path: 'menu/:id',
    component: MenuRestaurantPage
  },
  {
    path: 'login-client',
    component: LoginClient
  },
  {
    path: 'register-client',
    component: ResgistreClient
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];


  

