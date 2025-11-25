import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-restaurant.html',
  styleUrl: './menu-restaurant.css'
})

export class MenuRestaurantPage {
  isOwner = false;
  router = inject(Router);
  restaurantService = inject(RestaurantService);
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


  toggleFavorite(event: Event, itemId: string) {
    event.stopPropagation();

    this.menuService.toggleFavorite(itemId);
  }

  editProduct(id: string) {
    this.router.navigate(['/edit-product', id]);
  }

  async deleteProduct(productId: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {

      await this.menuService.deleteProduct(productId);

      alert('Producto eliminado');
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  }

  viewDetail(productId: string) {

    this.router.navigate(['/product-detail', productId]);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToRest() {
    this.router.navigate(['/restaurant-page']);
  }
}



