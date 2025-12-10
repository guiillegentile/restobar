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
  ];
  
addProductToMenu(restaurantId: string, productData: any): Promise<boolean> {
    return new Promise((resolve) => {
      
      const menu = this.menus.find(m => m.restaurantId === restaurantId);

      if (menu) {

        let maxId = 0;
        this.menus.forEach(m => {
          m.items.forEach(item => {
            const currentId = parseInt(item.id, 10);
            if (!isNaN(currentId) && currentId > maxId) {
              maxId = currentId;
            }
          });
        });

        
        const newId = (maxId + 1).toString();

        
        const newProduct = {
          id: newId,
          name: productData.name,
          price: productData.price,
          categoryId: productData.categoryId
        };

        
        menu.items.push(newProduct);
        
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
  
  
  getMenuByRestaurant(id: string) {
    return this.menus.find(m => m.restaurantId === id);
  }

async getProductById(id: string) {
    for (const menu of this.menus) {
      const foundItem = menu.items.find(item => item.id === id);
      if (foundItem) {
        return { ...foundItem, restaurantId: menu.restaurantId };
      }
    }
    throw new Error('Producto no encontrado');
  }

updateProduct(id: string, data: any): Promise<boolean> {
    return new Promise((resolve) => {
      for (const menu of this.menus) {
        const index = menu.items.findIndex(i => i.id === id);
        if (index !== -1) {
          menu.items[index] = { ...menu.items[index], ...data };
          resolve(true);
          return;
        }
      }
      resolve(false);
    });
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