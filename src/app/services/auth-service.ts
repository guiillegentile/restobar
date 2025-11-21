import { Injectable } from '@angular/core';
import { User, UserRole } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser: User | null = null;

  get currentUser(): User | null {
    return this._currentUser;
  }

  login(email: string, password: string, role: UserRole): boolean {
    // Para el TP: acepta cualquier combinación
    if (email && password) {
      this._currentUser = { email, role };
      return true;
    }
    return false;
  }

  logout() {
    this._currentUser = null;
  }
}