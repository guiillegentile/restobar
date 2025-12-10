import { inject, Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private _apiUrl = 'https://w370351.ferozo.com/api';
  private _httpClient = inject(HttpClient);

  constructor(){}

  async getRestaurants(): Promise<any>{
    return await firstValueFrom(this._httpClient.get<any>(`${this._apiUrl}/users`));
  }

  async getUser(id: number){
    return await firstValueFrom(this._httpClient.get<any>(`${this._apiUrl}/users/${id}`));
  }

  async getRestaurantById(id: number){
    return await firstValueFrom(this._httpClient.get<any>(`${this._apiUrl}/users/${id}`));
  }

}
