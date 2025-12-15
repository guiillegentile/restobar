import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

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

  async register(registerData: RegisterData): Promise<User> {
    try {
      const res = await fetch('https://w370351.ferozo.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      return await res.json();

    } catch (error) {
      throw error;
    }
  }
}