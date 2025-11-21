import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { LoginOwner } from './pages/login-owner/login-owner';
import { MenuPage } from './pages/menu-page/menu-page';
import { Loginclient } from './pages/login-client/login-client';
import { Resgistreclient } from './pages/resgistre-client/resgistre-client';

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
        path: 'menu',
        component: MenuPage
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
  

