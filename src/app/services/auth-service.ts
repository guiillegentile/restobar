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

  // Id del intervalo que revisa el token
  revisionTokenInterval?: ReturnType<typeof setInterval>;

  constructor() {
    // Si ya había token guardado al iniciar la app, empezamos a revisarlo
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken();
    }
  }

  // ---- LOGIN GENERAL (lo que ya tenías) ----
  async login(loginData: LoginData) {
    const res = await fetch('https://restaurant-api.somee.com/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (res.ok) {
      this.token = await res.text();
      localStorage.setItem('token', this.token);

      // Si no había intervalo corriendo, lo arrancamos
      if (!this.revisionTokenInterval) {
        this.revisionTokenInterval = this.revisionToken();
      }

      this.router.navigate(['/']);
    }
  }

  // ---- LOGIN DEL DUEÑO (para usar desde LoginOwnerComponent) ----
  async loginOwner(formValue: any) {
    const loginData: LoginData = {
      email: formValue.email,
      password: formValue.password
    };

    // Reutilizamos el login general
    await this.login(loginData);
  }

  // ---- LOGOUT (lo que ya tenías, con limpieza del intervalo) ----
  logout() {
    this.token = null;

    if (this.revisionTokenInterval) {
      clearInterval(this.revisionTokenInterval);
      this.revisionTokenInterval = undefined;
    }

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // ---- Revisión periódica del token (lo tuyo, tipado prolijo) ----
  private revisionToken(): ReturnType<typeof setInterval> {
    return setInterval(() => {
      if (this.token) {
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

        // exp viene en segundos → multiplicamos por 1000 para pasarlo a ms
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout();
        }
      }
    }, 600);
  }
}