import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { RestaurantService } from '../../services/restaurant-service';
import { CategoryService } from '../../services/categories-service';
import { FormsModule } from '@angular/forms';
import { Products } from '../../services/products-service';

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

  selectedCategory: string = "";
  categoryList: any[] = [];


  private _productService = inject(Products);
  products: any[] = [];


  constructor() {
    this.isOwner = localStorage.getItem('role') === 'owner';
  }

  async ngOnInit() {
    this.categoryList = await this.categoryService.getAllCategories(this.restaurantId);
    let rawProducts = [];
    if(localStorage.getItem("token")) {
      rawProducts = await this._productService.getMyProducts();
    }else{
      rawProducts = await this._productService.getProductsById(Number(this.restaurantId));
    }

    this.products = rawProducts.map((prod: any) => {
      return {
        ...prod,
        isFavorite: this.menuService.isFavorite(prod.id)
      }
    })
    this.cdr.detectChanges();
  }

  get filteredItems() {
    if (!this.products) return [];
    if (this.selectedCategory === "") {
      return this.products;
    }
    return this.products.filter((item: any) =>
      String(item.categoryId) === String(this.selectedCategory)
    );
  }

  goToNewProduct() {
    this.router.navigate(['/new-product', this.restaurantId]);
  }

  toggleFavorite(event: Event, itemId: string) {
    event.stopPropagation();
    const isNowFav = this.menuService.toggleFavorite(itemId);
    const indexProduct = this.products.findIndex((p: any) => p.id === itemId);
    if(indexProduct > -1 ){
      this.products[indexProduct].isFavorite = isNowFav;
      this.products = [...this.products];
      this.cdr.detectChanges();
    }
  }

  editProduct(productId: string) {
    this.router.navigate(['/edit-product', productId], {
      queryParams: { restaurantId: this.restaurantId }
    });
  }

  async deleteProduct(productId: string) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

    try {
      await this._productService.deleteProduct(productId);
      this.products = this.products.filter((product: any) => product.id !== productId);
      this.cdr.detectChanges();
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login-owner']);
  }
}





