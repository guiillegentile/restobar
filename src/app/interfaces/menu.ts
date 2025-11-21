export interface MenuItem {
    id: string;
    name: string;
    price: number;
  }
  
  export interface RestaurantMenu {
    restaurantId: string;
    items: MenuItem[];
  }
  