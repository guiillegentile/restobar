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
        { id: '1', name: 'Pizza Muzza', price: 12.000, categoryId: 123, imageUrl: 'assets/DgT5l_dXUAA8yic.jpg' },
        { id: '2', name: 'Pizza Napolitana', price: 12.500, isFavorite: true, categoryId: 123, imageUrl:'assets/8metlvp345_portada-pizza.jpg' },
        { id: '3', name: 'Pizza 4 Quesos', price: 11.000, categoryId: 123},
        { id: '4', name: 'Pizza Rucula', price: 13.000, isHappyHour: true, categoryId: 124},
        { id: '5', name: 'Pizza Margarita', price: 13500, discount: 10, categoryId: 125 },
        { id: '6', name: 'Pizza Carbonara', price: 14000, categoryId: 124 },
        { id: '37',name: 'Gaseosa - Linea Coca cola', price: 2000 , categoryId: 126 },
        { id: '38', name: 'Cerveza', price: 14800, isFavorite: true, categoryId: 123  },
        { id: '39', name: 'Vino Tinto', price: 13500, categoryId: 124  },
        { id: '40', name: 'Limonada', price: 14000, categoryId: 124  },
        { id: '41', name: 'Brownie con helado', price: 13500, categoryId: 125  },
        { id: '42', name: 'Bocha de helado', price: 14500, categoryId: 125  }
      ]
    },
    {
      restaurantId: '2',
      items: [
        { id: '7', name: 'Sushi Roll Salmón', price: 15200, categoryId: 123  },
        { id: '8', name: 'Nigiri Langostino', price: 14800, isFavorite: true, categoryId: 123  },
        { id: '9', name: 'Philadelphia', price: 13500, categoryId: 124  },
        { id: '10', name: 'Salmon Grill', price: 14000, categoryId: 124  },
        { id: '11', name: 'Sushi Vegetariano', price: 13500, categoryId: 125  },
        { id: '12', name: 'Sushi Rebozados', price: 14500, categoryId: 125  },
        { id: '43', name: 'Vino Blanco', price: 11.000, categoryId: 123},
        { id: '44', name: 'Vino Tinto', price: 13.000, isHappyHour: true, categoryId: 124},
        { id: '45', name: 'Gaseosas - Linea Coca-Cola', price: 13500, discount: 10, categoryId: 125 },
        { id: '46', name: 'Cerveza Artesanal', price: 14000, categoryId: 124 },

      ]
    },
    {
      restaurantId: '3',
      items: [
        { id: '13', name: 'Vacío con guarnición', price: 11000, categoryId: 125  },
        { id: '14', name: 'Provoleta', price: 7500, categoryId: 124  },
        { id: '15', name: '½ Bife de chorizo', price: 13500, categoryId: 123  },
        { id: '16', name: 'Entrecot al champignon con guarnición', price: 20000, categoryId: 125  },
        { id: '17', name: 'Lomo grillado con papas noisette', price: 21000, categoryId: 123  },
        { id: '18', name: '½ Cucharrasco', price: 12000, categoryId: 123  },
        { id: '47', name: 'Cerveza Nacional', price: 5000, categoryId: 126  },
        { id: '48', name: 'Cerveza Importada', price: 8000, categoryId: 126  },
        { id: '49', name: 'Gaseosa - Linea Coca-Cola', price: 3000, categoryId: 126  },
        { id: '50', name: 'Agua Mineral', price: 2500, categoryId: 126  },
        { id: '51', name: 'Flan casero con dulce de leche', price: 7000, categoryId: 125  },
        { id: '52', name: 'Helado artesanal (2 bochas)', price: 8000, categoryId: 125  }


      ]
    },
    {
      restaurantId: '4',
      items: [
        { id: '19', name: 'Capuccino', price: 7000, categoryId: 123 },
        { id: '20', name: 'Cortado', price: 5000, categoryId: 123 },
        { id: '21', name: 'Desayuno Campo: Dos tostadas con mermelada y queso , y una infusión', price: 13500, categoryId: 123 },
        { id: '22', name: 'Avocado Toast', price: 12000, categoryId: 125 },
        { id: '23', name: 'Submarino', price: 3500, categoryId: 126},
        { id: '24', name: 'Medialunas', price: 1000, categoryId: 126 },
        { id: '53', name: 'Té Helado', price: 4000, categoryId: 126 },
        { id: '54', name: 'Limonada', price: 4500, categoryId: 126 },
        { id: '55', name: 'Sándwich de Miga', price: 8000, categoryId: 125 },
        { id: '56', name: 'Brownie con Helado', price: 11000, categoryId: 124 },
        { id: '57', name: 'Cheesecake', price: 12000, categoryId: 124 }
      ]
    },
    {
      restaurantId: '5',
      items: [
        { id: '25', name: 'Ravioles de verdura', price: 18000, categoryId: 125 },
        { id: '26', name: 'Pasta Negra', price: 17500, categoryId: 125 },
        { id: '27', name: 'Sorrentinos de Jamón y Queso', price: 13500, categoryId: 123 },
        { id: '28', name: 'Fideos con mariscos', price: 20000, categoryId: 123 },
        { id: '29', name: 'Canelones de verdura', price: 19000, categoryId: 123 },
        { id: '30', name: 'Ñoquis de salmon', price: 17000, categoryId: 126 },
        { id: '58', name: 'Vino Rosado', price: 13000, categoryId: 124  },
        { id: '59', name: 'Vino Tinto', price: 15000, categoryId: 124  },
        { id: '60', name: 'Gaseosa - Linea Coca-Cola', price: 4000, categoryId: 126  },
        { id: '61', name: 'Cerveza Artesanal', price: 9000, categoryId: 126  },
        { id: '62', name: 'Tiramisú', price: 12000, categoryId: 125  },
        { id: '63', name: 'Toffie', price: 11000, categoryId: 125  },
        { id: '64', name: 'Chocotorta', price: 11500, categoryId: 125  }
      ]
    },
    {
      restaurantId: '6',
      items: [
        { id: '31', name: 'Fric Burger', price: 11000, categoryId: 124 },
        { id: '32', name: 'MacBurger', price: 7500, categoryId: 124 },
        { id: '33', name: 'Vegguie Burger', price: 13500, categoryId: 126 },
        { id: '34', name: 'Super Triple', price: 20000, categoryId: 123 },
        { id: '35', name: 'Burger Asada', price: 21000, categoryId: 126 },
        { id: '36', name: 'CheBurger', price: 12000, categoryId: 124 },
        { id: '65', name: 'Papas Fritas', price: 7000, categoryId: 125  },
        { id: '66', name: 'Aros de Cebolla', price: 8000, categoryId: 125  },
        { id: '67', name: 'Gaseosa - Linea Coca-Cola', price: 3000, categoryId: 126  },
        { id: '68', name: 'Cerveza Nacional', price: 6000, categoryId: 126  },
        { id: '69', name: 'Helado de Chocolate', price: 9000, categoryId: 125  },
        { id: '70', name: 'Helado de Vainilla', price: 9000, categoryId: 125  }
      ]
    }
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