import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    { id: '1', name: 'Pizzería Don Atilio', address: 'Av. Pellegrini 320' },
    { id: '2', name: 'Sushi House', address: 'Belgrano 450' },
    { id: '3', name: 'Parrilla El Gauchito', address: 'San Martín 2200' }
  ];

  constructor(){}

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}
