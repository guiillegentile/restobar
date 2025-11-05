import { Routes } from '@angular/router';
import path from 'path';
import { MainPageComponent } from './pages/main-page/main-page';
import { LoginOwnerComponent } from './pages/login-owner/login-owner';
import { AccesoRestaurantes } from './pages/acceso-restaurantes/acceso-restaurantes';


export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    }

    {
        path: 'login-owner',
        component: LoginOwnerComponent
    },

    {
        path: 'acceso-restaurantes',
        component: AccesoRestaurantes

    }

    
];
  

