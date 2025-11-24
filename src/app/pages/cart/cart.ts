import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../product-detail/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cartService = inject(CartService);
  private router = inject(Router);
  

  cartItems: CartItem[] = [];
  total: number = 0;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  increaseQty(item: CartItem) {
    this.cartService.addToCart(item.product, 1);
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      
      this.cartService.addToCart(item.product, -1);
    } else {
      
      this.removeItem(item);
    }
  }

  
  removeItem(item: CartItem) {
    if (confirm(`¿Quitar ${item.product.name} del pedido?`)) {
      this.cartService.removeFromCart(item.product.id);
    }
  }

  
  checkout() {
    if (this.cartItems.length === 0) return;

    const confirmOrder = confirm(`¿Confirmar pedido por $ ${this.total}?`);
    
    if (confirmOrder) {
  
      this.sendToWhatsApp();
      
      
      this.cartService.clearCart();
      this.router.navigate(['/menu']);
    }
  }

  
  sendToWhatsApp() {
    const phone = '5491112345678';
    let message = 'Hola! Quiero realizar el siguiente pedido:%0A%0A';
    
    this.cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} ($${item.subtotal})%0A`;
    });
    
    message += `%0A*Total: $${this.total}*`;
    
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  }


}