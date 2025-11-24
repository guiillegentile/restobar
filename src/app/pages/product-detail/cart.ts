import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  product: any;
  quantity: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  constructor() {
    this.loadCart();
  }


  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  
  private saveCart(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  get currentItems() {
    return this.cartItems.value;
  }

  addToCart(product: any, quantity: number) {
    const currentItems = this.cartItems.value;
    
    
    const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingItemIndex > -1) {
      
      const item = currentItems[existingItemIndex];
      item.quantity += quantity;
      item.subtotal = item.quantity * item.product.price;
      currentItems[existingItemIndex] = item;
    } else {
      
      currentItems.push({
        product: product,
        quantity: quantity,
        subtotal: quantity * product.price
      });
    }

    this.saveCart(currentItems);
  }

  removeFromCart(productId: string) {
    const filteredItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.saveCart(filteredItems);
  }

  clearCart() {
    this.saveCart([]);
  }

  
  getTotalPrice(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.subtotal, 0);
  }

  
  getTotalItems(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
  }
}