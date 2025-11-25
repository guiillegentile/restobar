import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { RestaurantService } from '../../services/restaurant-service';
import { CategoryService } from '../../services/categories-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-restaurant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-restaurant.html',
  styleUrl: './menu-restaurant.css'
})

export class MenuRestaurantPage implements OnInit {
  isOwner = false;
  router = inject(Router);
  categoryService = inject(CategoryService);
  restaurantService = inject(RestaurantService);
  cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private menuService = inject(MenuService);

  restaurantId = this.route.snapshot.params['id'];
  menu = this.menuService.getMenuByRestaurant(this.restaurantId);

  selectedCategory: string = ""; 
  categoryList: any[] = [];
  
  

  constructor() {
    this.isOwner = localStorage.getItem('role') === 'owner';
  }

  async ngOnInit() {
    this.categoryList = await this.categoryService.getCategories();
    this.cdr.detectChanges();
    console.log('Categorías cargadas:', this.categoryList);
  }

get filteredItems() {
    if (!this.menu || !this.menu.items) return [];

    if (this.selectedCategory === "") {
      return this.menu.items;
    }
    return this.menu.items.filter((item: any) => 
      String(item.categoryId) === String(this.selectedCategory)
    );
  }

  goToNewProduct() {
    this.router.navigate(['/new-product', this.restaurantId]);
  }

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





