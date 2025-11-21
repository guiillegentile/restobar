import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.html',
  styleUrls: ['./login-owner.scss']
})
export class LoginOwner {
  email = '';
  password = '';
  selectedRestaurantId: number | null = null;

  restaurants: Restaurant[] = [];

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.restaurants = this.restaurantService.getAll();
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.email || !this.password || !this.selectedRestaurantId) {
      this.errorMessage = 'Completá todos los campos.';
      return;
    }

    const restaurant = this.restaurants.find(
      r => r.id === Number(this.selectedRestaurantId)
    );

    if (!restaurant) {
      this.errorMessage = 'Seleccioná un restaurante válido.';
      return;
    }

    const ok = this.authService.login(this.email, this.password, 'OWNER');

    if (!ok) {
      this.errorMessage = 'Error al iniciar sesión.';
      return;
    }

    // Guardamos qué restaurant es el del dueño
    this.restaurantService.setCurrentRestaurant(restaurant);

    // Redirigimos al menú de ese restaurant
    this.router.navigate(['/menu']);
  }
}
