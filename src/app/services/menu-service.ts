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
        { id: '1', name: 'Pizza Muzza', price: 12000, categoryId: 139, imageUrl: 'assets/DgT5l_dXUAA8yic.jpg' },
        { id: '2', name: 'Pizza Napolitana', price: 12500, isFavorite: true, categoryId: 139, imageUrl:'assets/8metlvp345_portada-pizza.jpg' },
        { id: '3', name: 'Pizza 4 Quesos', price: 11000, categoryId: 139, imageUrl:'assets/e8bb41b65869-pizzacuatroquesos-adob-t.webp'},
        { id: '4', name: 'Pizza Rucula', price: 13000, isHappyHour: true, categoryId: 139, imageUrl:'assets/JAMON-CRUDO-Y-RUCULA-2.webp' },
        { id: '5', name: 'Pizza Margarita', price: 13500, discount: 10, categoryId: 139, imageUrl:'assets/images (5).jpeg/pizza-margarita-1200x800.jpg' },
        { id: '6', name: 'Pizza Carbonara', price: 14000, categoryId: 139, imageUrl:'assets/images (6).jpeg' },
        { id: '37',name: 'Gaseosa - Linea Coca cola', price: 2000 , categoryId: 140 },
        { id: '38', name: 'Cerveza', price: 14800, isFavorite: true, categoryId: 140 },
        { id: '39', name: 'Vino Tinto', price: 13500, categoryId: 140 },
        { id: '40', name: 'Limonada', price: 14000, categoryId: 140  },
        { id: '41', name: 'Brownie con helado', price: 13500, categoryId: 142  },
        { id: '42', name: 'Bocha de helado', price: 14500, categoryId: 142  }
      ]
    },
    {
      restaurantId: '2',
      items: [
        { id: '7', name: 'New york roll', price: 15200, categoryId: 139, imageUrl: 'assets/5L2oDs4Ey_0x750__1.jpg', description: 'Delicioso roll de sushi relleno de aguacate, queso crema y salmón ahumado./ 8 unidades'  },
        { id: '8', name: 'Nigiri', price: 14800, isFavorite: true, categoryId: 139, imageUrl: 'assets/sashimi-salmon.png', description: 'Deliciosos nigiris de salmón fresco sobre arroz avinagrado./ 3 unidades'  },
        { id: '9', name: 'Philadelphia roll', price: 13500, categoryId: 139, imageUrl: 'assets/images.jpeg', description: 'Clásico roll de sushi relleno de queso crema, pepino y salmón ahumado./ 8 unidades'  },
        { id: '10', name: 'hot roll', price: 14000, categoryId: 139, imageUrl: 'assets/Salmon-1.jpeg', description: 'Crujiente roll de sushi relleno de salmón tempurizado y queso crema, cubierto con salsa especial./ 8 unidades'  },
        { id: '11', name: 'Sushi Vegetariano', price: 13500, categoryId: 139, imageUrl: 'assets/images (1).jpeg', description: 'Variedad de sushi vegetariano con ingredientes frescos como aguacate, pepino y zanahoria./ 8 unidades'  },
        { id: '12', name: 'temakis', price: 14500, categoryId: 139, imageUrl:'assets/Img-Internas-Blog-Temaki_480x480.webp', description: 'Deliciosos temakis rellenos de ingredientes frescos y sabrosos./ 3 unidades'  },
        { id: '43', name: 'Vino Blanco', price: 11000, categoryId: 140, imageUrl: 'assets/BERNE_ROMANCE_LIFESTYLE_SQUARE_FORMAT_1400x_1_2c2585a9-2ec4-40f1-8b6d-1d62d9b9cf6c.webp'},
        { id: '44', name: 'Vino Tinto', price: 13000, isHappyHour: true, categoryId: 140, imageUrl  : 'assets/descarga (8).jpeg'},
        { id: '45', name: 'Gaseosas - Linea Coca-Cola', price: 13500, discount: 10, categoryId: 140 },
        { id: '46', name: 'Cerveza Artesanal', price: 14000, categoryId: 140, imageUrl  : 'assets/descarga (2).jpeg'  },

      ]
    },
    {
      restaurantId: '3',
      items: [
        { id: '13', name: 'Vacío con guarnición', price: 11000, categoryId: 139, imageUrl: 'assets/D_NQ_NP_994465-MLA83383164013_032025-O.webp', description: 'Jugoso corte de carne vacuna, acompañado de papas asadas o ensalada mixta.'  },
        { id: '14', name: 'Provoleta', price: 7500, categoryId: 141, imageUrl: 'assets/99b812c8-1c0b-4838-b7be-ed32ddc2920a.jpg', description: 'Deliciosa provoleta argentina, queso provolone gratinado con orégano y ají molido.'  },
        { id: '15', name: '½ Bife de chorizo', price: 13500, categoryId: 139, imageUrl: 'assets/bife-de-chorizo.webp', description: 'Tierno y sabroso bife de chorizo, acompañado de papas fritas o ensalada.'  },
        { id: '16', name: 'Entrecot al champignon con guarnición', price: 20000, categoryId: 139, imageUrl: 'assets/images (2).jpeg', description: 'Exquisito entrecot de carne vacuna, servido con salsa de champiñones y guarnición a elección.'  },
        { id: '17', name: 'Lomo grillado con papas noisette', price: 21000, categoryId: 139, imageUrl: 'assets/images (3).jpeg', description: 'Delicado lomo de carne vacuna, acompañado de papas noisette doradas y crujientes.'  },
        { id: '18', name: '½ Cucharrasco', price: 12000, categoryId: 139, imageUrl: 'assets/images (4).jpeg', description: 'Sabroso cucharrasco de carne vacuna, servido con ensalada fresca o papas al horno.'  },
        { id: '47', name: 'Cerveza Nacional', price: 5000, categoryId: 140, imageUrl  : 'assets/descarga (2).jpeg'  },
        { id: '48', name: 'Cerveza Importada', price: 8000, categoryId: 140, imageUrl  : 'assets/descarga (2).jpeg'  },
        { id: '49', name: 'Gaseosa - Linea Coca-Cola', price: 3000, categoryId: 140, imageUrl  : 'assets/coca-006ef25d4b11679fa917251138441237-480-0.webp'  },
        { id: '50', name: 'Agua Mineral', price: 2500, categoryId: 140  },
        { id: '51', name: 'Flan casero con dulce de leche', price: 7000, categoryId: 142  },
        { id: '52', name: 'Helado artesanal (2 bochas)', price: 8000, categoryId: 142 }


      ]
    },
    {
      restaurantId: '4',
      items: [
        { id: '19', name: 'Capuccino', price: 7000, categoryId: 140, imageUrl: 'assets/images (7).jpeg', description: 'Delicioso capuccino preparado con café espresso y leche espumosa, espolvoreado con cacao en polvo.'  },
        { id: '20', name: 'Cortado', price: 5000, categoryId: 140, imageUrl: 'assets/comment-faire-un-cortado-899611.webp', description: 'Café espresso con un toque de leche caliente, ideal para los amantes del café intenso.'  },
        { id: '21', name: 'Desayuno Campo: Dos tostadas con mermelada y queso , y una infusión', price: 13500, categoryId: 139, imageUrl: 'assets/images (8).jpeg', description: 'Disfruta de un desayuno completo con dos tostadas acompañadas de mermelada y queso, junto con una infusión a elección (té, café o mate)./ de lunes a viernes 10% pidiendo este desayuno '  },
        { id: '22', name: 'Avocado Toast', price: 12000, categoryId: 139, imageUrl: 'src/assets/avocado-toast-with-everything-bagel-seasoning-feat.jpg', description: 'Tostada de pan integral cubierta con puré de aguacate, tomate cherry y semillas de chía./ Ideal para un desayuno saludable y nutritivo.'  },
        { id: '23', name: 'Submarino', price: 3500, categoryId: 140, imageUrl: 'assets/images (9).jpeg', description: 'Bebida caliente hecha con leche y una barra de chocolate derretida, perfecta para los días fríos.'  },
        { id: '24', name: 'Medialunas', price: 1000, categoryId: 139, imageUrl: 'assets/medialunas-manteca-ig01.webp', description: 'Deliciosas medialunas frescas y hojaldradas, ideales para acompañar tu café o té.'  },
        { id: '53', name: 'Té Helado', price: 4000, categoryId: 140 },
        { id: '54', name: 'Limonada', price: 4500, categoryId: 140 },
        { id: '55', name: 'Sándwich de Miga', price: 8000, categoryId: 139 },
        { id: '56', name: 'Brownie con Helado', price: 7000, categoryId: 142},
        { id: '57', name: 'Cheesecake', price: 8000, categoryId: 142},
      ]
    },
    {
      restaurantId: '5',
      items: [
        { id: '25', name: 'Ravioles de verdura', price: 18000, categoryId: 139, imageUrl: 'assets/455412.jpg src/assets/medialunas-manteca-ig01.webp', description: 'elegi tu salsa'  },
        { id: '26', name: 'Pasta Negra', price: 17500, categoryId: 139, imageUrl: 'assets/23879.jpg.jpg', description: 'elegi tu salsa'  },
        { id: '27', name: 'Sorrentinos de Jamón y Queso', price: 13500, categoryId: 139, imageUrl: 'assets/images (10).jpeg', description: 'elegi tu salsa'  },
        { id: '28', name: 'Fideos con mariscos', price: 20000, categoryId: 139, imageUrl: 'assets/images (10).jpeg src/assets/Tallarines-o-pastas-con-mariscos-en-salsa-roja.webp', description: 'elegi tu salsa'  },
        { id: '29', name: 'Canelones de verdura', price: 19000, categoryId: 139, imageUrl: 'assets/canelones-ricota-verdura-stories01b.webp', description: 'elegi tu salsa'  },
        { id: '30', name: 'Ñoquis de salmon', price: 17000, categoryId: 139, imageUrl: 'assets/images (11).jpeg', description: 'elegi tu salsa'  },
        { id: '58', name: 'Vino Rosado', price: 11000, categoryId: 140, imageUrl  : 'assets/BERNE_ROMANCE_LIFESTYLE_SQUARE_FORMAT_1400x_1_2c2585a9-2ec4-40f1-8b6d-1d62d9b9cf6c.webp'  }, 
        { id: '59', name: 'Vino Tinto', price: 11000, categoryId: 140, imageUrl  : 'assets/descarga (8).jpeg'  },
        { id: '60', name: 'Gaseosa - Linea Coca-Cola', price: 4000, categoryId: 140, imageUrl  : 'assets/coca-006ef25d4b11679fa917251138441237-480-0.webp'  },
        { id: '61', name: 'Cerveza Artesanal', price: 6000,isHappyHour: true, categoryId: 140, imageUrl  : 'assets/descarga (2).jpeg'  },
        { id: '62', name: 'Tiramisú', price: 10000, categoryId: 142  },
        { id: '63', name: 'Toffie', price: 9000, categoryId: 142  },
        { id: '64', name: 'Chocotorta', price: 9500, categoryId: 142 }
      ]
    },
    {
      restaurantId: '6',
      items: [
        { id: '31', name: 'Fric Burger', price: 11000, categoryId: 139, imageUrl: 'assets/images (12).jpeg', description: 'Hamburguesa clásica con lechuga, tomate, cebolla y salsa especial.'  },
        { id: '32', name: 'MacBurger', price: 12500, categoryId: 139, imageUrl: 'assets/descarga (6).jpeg', description: 'Hamburguesa doble con queso cheddar, bacon crujiente, lechuga, tomate y salsa BBQ.'  },
        { id: '33', name: 'Vegguie Burger', price: 13500, categoryId: 139, imageUrl: 'assets/descarga (5).jpeg', description: 'Hamburguesa vegetariana hecha con garbanzos y espinaca, acompañada de lechuga, tomate y mayonesa vegana.'  },
        { id: '34', name: 'Super Triple', price: 13000, categoryId: 139, imageUrl: 'assets/images (13).jpeg', description: 'Hamburguesa con tres medallones de carne, queso cheddar, lechuga, tomate y salsa especial.'  },
        { id: '35', name: 'Burger Asada', price: 12000, categoryId: 139, imageUrl: 'assets/Carne-Asada-Guacamole-Pico-De-Gallo-Burgers-24-500x500.jpg', description: 'Hamburguesa con medallón de carne asada, cebolla caramelizada, queso suizo y mayonesa de ajo.'  },
        { id: '36', name: 'CheBurger', price: 12000, categoryId: 139, imageUrl: 'assets/images (13).jpeg', description: 'Hamburguesa estrella'  },
        { id: '65', name: 'Papas Fritas', price: 7000, categoryId: 141, imageUrl  : 'assets/descarga.jpeg'  },
        { id: '66', name: 'Aros de Cebolla', price: 8000, categoryId: 141, imageUrl  : 'assets/descarga (1).jpeg'  },
        { id: '67', name: 'Gaseosa - Linea Coca-Cola', price: 3000, categoryId: 140, imageUrl  : 'assets/coca-006ef25d4b11679fa917251138441237-480-0.webp'  },
        { id: '68', name: 'Cerveza Nacional', price: 6000, isHappyHour: true,categoryId: 140, imageUrl  : 'assets/descarga (2).jpeg'  },
        { id: '69', name: 'Helado de Chocolate', price: 4000, categoryId: 142  },
        { id: '70', name: 'Helado de Dulce de Leche', price: 6500, categoryId: 142 },
        { id: '71', name: 'Agua mineral', price: 3000, categoryId: 142}

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