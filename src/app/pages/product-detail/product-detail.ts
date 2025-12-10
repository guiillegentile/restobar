import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {  CartService } from '../../services/cart-service';
import { CommonModule } from '@angular/common';
import { Products} from '../../services/products-service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})

export class ProductDetail {
private route = inject(ActivatedRoute);
private router = inject(Router);
  private _productService = inject(Products);
  private cdr = inject(ChangeDetectorRef)
  private cartService = inject(CartService);
quantity: number = 1;
  
  product: any = null;
  isLoading: boolean = true;
  error: boolean = false;

  async ngOnInit() {
  
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      await this.loadProduct(productId);
    } else {
      this.error = true;
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async loadProduct(id: string) {
    try {
      this.isLoading = true;
      
      this.product = await this._productService.getProductById(Number(id));
      
    } catch (err) {
      console.error(err);
      this.error = true;
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.product) return;

    this.cartService.addToCart(this.product, this.quantity);
    
    
    alert(`Agregado: ${this.quantity} x ${this.product.name}`);
    
   this.router.navigate(['/cart']);
  }

}