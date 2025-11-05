import { Routes } from '@angular/router';

export const routes = [
    {
      path: 'acceso',
      loadComponent: () =>
        import('./pages/acceso-restaurantes/acceso-restaurantes')
          .then(m => m.AccesoRestaurantes)
    },
    { path: '', pathMatch: 'full', redirectTo: 'acceso' },
    { path: '**', redirectTo: 'acceso' }
  ];
  

