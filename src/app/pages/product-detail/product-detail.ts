import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { CartService } from './cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
private route = inject(ActivatedRoute);
  private menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef)
  private cartService = inject(CartService);
quantity: number = 1;
  
  product: any = null;
  isLoading: boolean = true;
  error: boolean = false;

  async ngOnInit() {
  
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId)
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
      
      this.product = await this.menuService.getProductById(id);
      console.log(this.product)
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
    
  }

}
