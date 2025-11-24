import { Component, inject, input, OnInit, viewChild } from '@angular/core';
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
  productId = input<string>();

  prodForm = viewChild<NgForm>('prodForm');

  isEditMode = false;

  productData = {
    id: '',
    name: '',
    price: null as number | null
  };

  async ngOnInit() {

    this.restaurantId = this.route.snapshot.params['restaurantId'] 
      || this.route.snapshot.params['id'];

    if (this.productId()) {
      this.isEditMode = true;
      const product = await this.menuService.getProductById(this.productId()!);

      this.productData = {
        id: product.id,
        name: product.name,
        price: product.price
      };

      this.prodForm()?.setValue({
        id: this.productData.id,
        name: this.productData.name,
        price: this.productData.price
      });
    }
  }

  async saveProduct(form: NgForm) {
    if (form.invalid) return;

    this.errorEnBack = false;
    this.isLoading = true;

    const dataToSend = {
      ...form.value,
      price: form.value.price ?? 0
    };

    try {
      let response;

      if (this.isEditMode && this.productId()) {
        response = await this.menuService.updateProduct(this.productId()!, dataToSend);
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
      console.error(e);
      this.isLoading = false;
      this.errorEnBack = true;
    }
  }
}
