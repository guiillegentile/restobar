import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { Restaurant } from '../../interfaces/restaurants';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-restaurant-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Spinner],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.css'
})
export class RestaurantMenuPage implements OnInit{
  private restaurantService = inject(RestaurantService);
  private _cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  loading = false
  isOwner = false;

  restaurants: Restaurant[] = [];

  async ngOnInit(){
    this.loading = true;
    this.restaurants = await this.restaurantService.getRestaurants();
    
    this.loading = false;
    this.isOwner = localStorage.getItem('role') === 'owner';
    
    this._cdr.detectChanges();
  }

  goToRestaurant(id: string) {
    this.router.navigate(['/menu', id]); 
  }
}





