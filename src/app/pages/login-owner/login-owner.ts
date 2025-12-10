import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
export class LoginOwnerComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  restaurantService = inject(RestaurantService);
  cdr = inject(ChangeDetectorRef);


  errorLogin = false;
  isLoading = false;
  restaurants : any[] = [];

  async ngOnInit() {
    this.restaurants = await this.restaurantService.getRestaurants();
  }

  async loginOwner(form: any) {
    this.errorLogin = false;
    
    if (form.invalid) return;

    this.isLoading = true;
    
    try {
      await this.authService.loginOwner(form.value);
      
      localStorage.setItem('role', 'owner'); 
      const restaurantId = this.authService.currentUser()?.id;
      this.router.navigate(['/menu', restaurantId]);
      this.isLoading = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      this.errorLogin = true;
      this.isLoading = false;
      this.cdr.detectChanges();
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}