import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../interfaces/product';
import { Restaurant } from '../../interfaces/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.html',
  styleUrls: ['./menu-page.scss']
})
export class MenuPage implements OnInit {
  restaurantName = 'Restaurante Demo';
  restaurantAddress = 'Dirección no seleccionada';
  currentRestaurant: Restaurant | null = null;

  products: Product[] = [
    {
      id: 1,
      name: 'Milanesa con fritas',
      description: 'Milanesa de ternera con papas fritas',
      price: 4500,
      category: 'Platos principales'
    },
    {
      id: 2,
      name: 'Pizza muzzarella',
      description: 'Pizza de muzzarella con 8 porciones',
      price: 6000,
      category: 'Platos principales'
    },
    {
      id: 3,
      name: 'Empanadas',
      description: 'Docena surtida',
      price: 5200,
      category: 'Entradas'
    },
    {
      id: 4,
      name: 'Coca Cola 1.5L',
      description: 'Bebida gaseosa',
      price: 1800,
      category: 'Bebidas'
    }
  ];

  constructor(
    public cartService: CartService,
    public favoritesService: FavoritesService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    const r = this.restaurantService.getCurrentRestaurant();
    if (r) {
      this.currentRestaurant = r;
      this.restaurantName = r.name;
      this.restaurantAddress = r.address;
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  toggleFavorite(product: Product) {
    this.favoritesService.toggleFavorite(product);
  }

  isFavorite(product: Product): boolean {
    return this.favoritesService.isFavorite(product.id);
  }

  get cartItems() {
    return this.cartService.items;
  }

  get cartTotal() {
    return this.cartService.getTotal();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
