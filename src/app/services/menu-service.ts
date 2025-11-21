import { Injectable } from '@angular/core';
import { RestaurantMenu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private menus: RestaurantMenu[] = [
    {
      restaurantId: '1',
      items: [
        { id: '1', name: 'Pizza Muzza', price: 12.000 },
        { id: '2', name: 'Pizza Napolitana', price: 12.500 },
        { id: '3', name: 'Pizza 4 Quesos', price: 11.000 },
        { id: '4', name: 'Pizza Rucula', price: 13.000},
        { id: '5', name: 'Pizza Margarita', price: 13500 },
        { id: '6', name: 'Pizza Carbonara', price: 14000 }
      ]
    },
    {
      restaurantId: '2',
      items: [
        { id: '1', name: 'Sushi Roll Salmón', price: 15200 },
        { id: '2', name: 'Nigiri Langostino', price: 14800 },
        { id: '3', name: 'Philadelphia', price: 13500 },
        { id: '4', name: 'Salmon Grill', price: 14000 },
        { id: '5', name: 'Sushi Vegetariano', price: 13500 },
        { id: '6', name: 'Sushi Rebozados', price: 14500 }
      ]
    },
    {
      restaurantId: '3',
      items: [
        { id: '1', name: 'Vacío con guarnición', price: 11000 },
        { id: '2', name: 'Provoleta', price: 7500 },
        { id: '3', name: '½ Bife de chorizo', price: 13500 },
        { id: '4', name: 'Entrecot al champignon con guarnición', price: 20000 },
        { id: '5', name: 'Lomo grillado con papas noisette', price: 21000 },
        { id: '2', name: '½ Cucharrasco', price: 12000 }
      ]
    }
  ];
  addProductToMenu(restaurantId: string, product: MenuItem) {
    const menu = this.getMenuByRestaurant(restaurantId);

    if (menu) {
      menu.items.push(product);
    }
  }
  
  getMenuByRestaurant(id: string) {
    return this.menus.find(m => m.restaurantId === id);
  }
}
