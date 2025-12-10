import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const publicGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const token = localStorage.getItem('token');
  const authService = inject(AuthService);
  if (token) {
    const id = authService.getUserIdFromToken();
    router.navigate(['/menu', id])
    return false
  }

  return true;
};
