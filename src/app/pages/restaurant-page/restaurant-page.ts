import { Component, inject } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { Restaurant } from '../../interfaces/restaurants';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.scss'
})
export class RestaurantMenuPage {
  private restaurantService = inject(RestaurantService);
  private router = inject(Router);

  restaurants: Restaurant[] = [];

  constructor() {
    this.restaurants = this.restaurantService.getRestaurants();
  }

  goToRestaurant(id: string) {
    this.router.navigate(['/menu’, id]);
  }
}


