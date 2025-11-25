import { Component, inject, input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.css']
})
export class NewProductPage implements OnInit {

menuService = inject(MenuService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  errorEnBack = false;
  isLoading = false;

  restaurantId = "";
  currentProductId: string | null = null; 

  prodForm = viewChild<NgForm>('prodForm');

  isEditMode = false;

  productData = {
    id: '',
    name: '',
    price: null as number | null
  };

async ngOnInit() {
    
    this.isEditMode = this.router.url.includes('edit');

    if (this.isEditMode) {
      
      this.currentProductId = this.route.snapshot.paramMap.get('id');

      if (this.currentProductId) {
        try {
          const product: any = await this.menuService.getProductById(this.currentProductId);
          
          
          this.restaurantId = product.restaurantId;

          
          this.productData = {
            id: product.id,
            name: product.name,
            price: product.price
          };
        } catch (error) {
          this.errorEnBack = true;
        }
      }

    } else {
      
      this.restaurantId = this.route.snapshot.paramMap.get('restaurantId') 
                       || this.route.snapshot.paramMap.get('id') 
                       || "";

      
      this.productData = {
        id: '',
        name: '',
        price: null
      };
    }
  }

async saveProduct(form: NgForm) {
    if (form.invalid) return;

    this.errorEnBack = false;
    this.isLoading = true;

    const dataToSend = {
      name: form.value.name,
      price: form.value.price ?? 0
    };

    try {
      let response;

      if (this.isEditMode && this.currentProductId) {
        
        response = await this.menuService.updateProduct(this.currentProductId, dataToSend);
      } else {
        
        response = await this.menuService.addProductToMenu(this.restaurantId, dataToSend);
      }

      this.isLoading = false;

      if (!response) {
        this.errorEnBack = true;
        return;
      }

      this.router.navigate(["/menu", this.restaurantId]);

    } catch (e) {
      this.isLoading = false;
      this.errorEnBack = true;
    }
  }
}