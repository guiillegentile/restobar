import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  http = inject(HttpClient);
  
  token: string | null = localStorage.getItem('token');

  
  revisionTokenInterval?: ReturnType<typeof setInterval>;

  constructor() {
    if (this.token) {
      this.revisionTokenInterval = this.revisionToken();
    }
  }

async login(loginData: LoginData) {
    try {
      const response: any = await firstValueFrom(
        this.http.post('https://w370351.ferozo.com/api/Authentication/login', loginData, {
           responseType: 'text'
        })
      );
      const responseObj = JSON.parse(response);
      this.token = responseObj.token
      localStorage.setItem('token', this.token ?? '');
      
      if (!this.revisionTokenInterval) {
         this.revisionTokenInterval = this.revisionToken();
      }

    } catch (error) {
      console.error('Error en login:', error);
    }
  }

  
  async loginOwner(formValue: any) {
    const loginData: LoginData = {
      email: formValue.email,
      password: formValue.password
    };

    
    await this.login(loginData);
  }

  
  logout() {
    this.token = null;

    if (this.revisionTokenInterval) {
      clearInterval(this.revisionTokenInterval);
      this.revisionTokenInterval = undefined;
    }

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  
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

        
        if (new Date(claims.exp * 1000) < new Date()) {
          this.logout();
        }
      }
    }, 600);
  }
}