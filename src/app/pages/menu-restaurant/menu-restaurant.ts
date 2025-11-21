import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-restaurant.html',
  styleUrl: './menu-restaurant-page.scss'
})

export class MenuRestaurantPage {
  isOwner = false;

constructor() {
  this.isOwner = localStorage.getItem('role') === 'owner';
}
goToNewProduct() {
  this.router.navigate(['/new-product', this.restaurantId]);
}
  private route = inject(ActivatedRoute);
  private menuService = inject(MenuService);

  restaurantId = this.route.snapshot.params['id'];
  menu = this.menuService.getMenuByRestaurant(this.restaurantId);
}



