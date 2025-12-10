import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface RegisterData {
  restaurantName: string;
  firstName: string;
  lastName: string;
  password: string;
  address: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _apiUrl = 'https://w370351.ferozo.com/api/users';
  private _httpClient = inject(HttpClient);


  async register(registerData: RegisterData) {
    try {
      return firstValueFrom(
        this._httpClient.post<User>(`${this._apiUrl}`, registerData, {
          headers: { "Content-Type": "application/json" }
        })
      );
      
    } catch (error) {
      throw error;
    }
  }

}