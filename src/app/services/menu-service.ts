import { inject, Injectable } from '@angular/core';
import { MenuItem, RestaurantMenu } from '../interfaces/menu';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  private _apiUrl = 'https://w370351.ferozo.com/api/products';
  private _http = inject(HttpClient);

  private menus: RestaurantMenu[] = [
    {
      restaurantId: '1',
      items: [
        { id: '1', name: 'Pizza Muzza', price: 12.000 },
        { id: '2', name: 'Pizza Napolitana', price: 12.500, isFavorite: true },
        { id: '3', name: 'Pizza 4 Quesos', price: 11.000 },
        { id: '4', name: 'Pizza Rucula', price: 13.000, isHappyHour: true},
        { id: '5', name: 'Pizza Margarita', price: 13500, discount: 10 },
        { id: '6', name: 'Pizza Carbonara', price: 14000 }
      ]
    },
    {
      restaurantId: '2',
      items: [
        { id: '7', name: 'Sushi Roll Salmón', price: 15200 },
        { id: '8', name: 'Nigiri Langostino', price: 14800, isFavorite: true },
        { id: '9', name: 'Philadelphia', price: 13500 },
        { id: '10', name: 'Salmon Grill', price: 14000 },
        { id: '11', name: 'Sushi Vegetariano', price: 13500 },
        { id: '12', name: 'Sushi Rebozados', price: 14500 }
      ]
    },
    {
      restaurantId: '3',
      items: [
        { id: '13', name: 'Vacío con guarnición', price: 11000 },
        { id: '14', name: 'Provoleta', price: 7500 },
        { id: '15', name: '½ Bife de chorizo', price: 13500 },
        { id: '16', name: 'Entrecot al champignon con guarnición', price: 20000 },
        { id: '17', name: 'Lomo grillado con papas noisette', price: 21000 },
        { id: '18', name: '½ Cucharrasco', price: 12000 }
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

getProductById(productId: string) {
    const allItems = this.menus.flatMap(menu => menu.items);
    const foundProduct = allItems.find(item => item.id === productId);

    if (foundProduct) {
      return Promise.resolve({ ...foundProduct });
    } else {
      return Promise.reject('Producto no encontrado');
    }
  }

updateProduct(productId: string, updatedData: any) {

    for (const menu of this.menus) {
      const index = menu.items.findIndex(item => item.id === productId);
      
      if (index !== -1) {

        menu.items[index] = { 
          ...menu.items[index], 
          ...updatedData,       
          id: productId         
        };
        return Promise.resolve(true);
      }
    }
    return Promise.reject('No se pudo actualizar, producto no existe');
  }

  deleteProduct(productId: string) {
     for (const menu of this.menus) {
       const index = menu.items.findIndex(item => item.id === productId);
       if (index !== -1) {
         menu.items.splice(index, 1); 
         return Promise.resolve(true);
       }
     }
     return Promise.reject('No encontrado');
  }

  toggleFavorite(productId: string): boolean {
    const allItems = this.menus.flatMap(menu => menu.items);
    const item = allItems.find(i => i.id === productId);
    
    if (item) {
      item.isFavorite = !item.isFavorite;
      return item.isFavorite;
    }
    return false;
  }
}
