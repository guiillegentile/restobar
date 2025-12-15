import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

private _apiUrl = 'https://w370351.ferozo.com/api';

  constructor() {}

  async getRestaurants(): Promise<any> {
    try {
      const res = await fetch(`${this._apiUrl}/users`, {
        method: 'GET'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUser(id: number) {
    try {
      const res = await fetch(`${this._apiUrl}/users/${id}`, {
        method: 'GET'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getRestaurantById(id: number) {
    try {
      const res = await fetch(`${this._apiUrl}/users/${id}`, {
        method: 'GET'
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
