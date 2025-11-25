export interface MenuItem {
    id: string;
    name: string;
    price: number
    isFavorite?: boolean;
    isHappyHour?: boolean;
    discount ?: number;
    imageUrl ?: string;
  }
  
  export interface RestaurantMenu {
    restaurantId: string;
    items: MenuItem[];
  }
  