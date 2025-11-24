import { Component, inject, OnInit } from '@angular/core';
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
  styleUrl: './login-owner.css'
})
export class LoginOwnerComponent {


errorLogin = false;
  isLoading = false;

  authService = inject(AuthService);
  router = inject(Router);
  restaurantService = inject(RestaurantService);

  restaurants = this.restaurantService.getRestaurants();

  async loginOwner(form: any) {
    this.errorLogin = false;
    
    if (form.invalid) return;

    this.isLoading = true;
    
    try {
      localStorage.setItem('role', 'owner'); 
      
      await this.authService.loginOwner(form.value);

      const restaurantId = form.value.restaurantId;
      this.router.navigate(['/menu', restaurantId]);

    } catch (error) {
      console.error(error);
      this.errorLogin = true;
    } finally {
      this.isLoading = false;
    }
  }
}