import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { RestaurantService } from '../../services/restaurant-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-login-owner',
  standalone: true,
  imports: [FormsModule, RouterModule, Spinner],
  templateUrl: './login-owner.html',
  styleUrl: './login-owner.scss'
})
export class LoginOwnerComponent {

  errorLogin = false;
  isLoading = false;

  authService = inject(AuthService);
  router = inject(Router);
  restaurantService = inject(RestaurantService);

  // Lista de restaurantes para el <select>
  restaurants = this.restaurantService.getRestaurants();

  async loginOwner(form: any) {
    this.errorLogin = false;

    // Validaciones básicas
    if (!form.value.email || !form.value.password || !form.value.restaurantId) {
      this.errorLogin = true;
      return;
    }

    this.isLoading = true;

    // Llamada al servicio de autenticación del dueño
    await this.authService.loginOwner(form.value);

    this.isLoading = false;

    // OJO: en el HTML el name es "restaurantId"
    const restaurantId = form.value.restaurantId;

    // Navegar al menú del restaurante del dueño
    // (asumiendo que la ruta es algo como: path: 'menu/:id', component: MenuPage)
    this.router.navigate(['/menu', restaurantId]);
  }
}