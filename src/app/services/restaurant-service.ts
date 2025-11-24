import { inject, Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private _apiUrl = 'https://w370351.ferozo.com/api/products';
  private _httpClient = inject(HttpClient);
  private restaurants: Restaurant[] = [
    { id: '1', name: 'Pizzería Don Atilio', address: 'Av. Pellegrini 320' },
    { id: '2', name: 'Sushi House', address: 'Belgrano 450' },
    { id: '3', name: 'Parrilla El Gauchito', address: 'San Martín 2200' },
    { id: '4', name: 'Café Central', address: 'Córdoba 123' }
  ];

  constructor(){}

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

}
