import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);

  // Token actual en memoria
  token: string | null = localStorage.getItem('token');

  // Guardamos el id del setInterval
  revisionTokenInterval?: ReturnType<typeof setInterval>;

  constructor() {
    // Si ya había token guardado, arrancamos la revisión
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken();
    }
  }
  
  async login(loginData: LoginData) {
    const res = await fetch('https://restaurant-api.somee.com/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (res.ok) {
      this.token = await res.text();
      localStorage.setItem('token', this.token);

      // Arrancamos el intervalo de revisión si no estaba
      if (!this.revisionTokenInterval) {
        this.revisionTokenInterval = this.revisionToken();
      }

      this.router.navigate(['/']);
    } else {
      // Acá podrías manejar error de login si querés
      console.error('Login falló con status', res.status);
    }
  }

  logout() {
    this.token = null;

    // Limpiamos el intervalo si existe
    if (this.revisionTokenInterval) {
      clearInterval(this.revisionTokenInterval);
      this.revisionTokenInterval = undefined;
    }

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Revisa cada 600ms si el token expiró
  private revisionToken(): ReturnType<typeof setInterval> {
    return setInterval(() => {
      if (this.token) {
        try {
          const base64Url = this.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );

          const claims: { exp: number } = JSON.parse(jsonPayload);

          // exp viene en segundos → lo pasamos a milisegundos
          if (new Date(claims.exp * 1000) < new Date()) {
            this.logout();
          }
        } catch (e) {
          console.error('Error al validar token:', e);
          this.logout();
        }
      }
    }, 600);
  }
}