import { ChangeDetectorRef, Component, inject, input, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { CategoryService } from '../../services/categories-service';
import { Products } from '../../services/products-service';

@Component({
  selector: 'app-new-product',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.css']
})
export class NewProductPage implements OnInit {

  menuService = inject(MenuService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private _productService = inject(Products)
  private _categoryService = inject(CategoryService);
  cdr = inject(ChangeDetectorRef);
  categories : any[] = [];

  errorEnBack = false;
  isLoading = false;

  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    price: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    categoryId : new FormControl ('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    featured : new FormControl (true, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    labels : new FormControl (["None"], {
      nonNullable: true,
      validators: [Validators.required]
    }),
    recommendedFor : new FormControl (0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    discount: new FormControl (0, {
      nonNullable: true,
      validators: [Validators.required]
    }),
    hasHappyHour: new FormControl (true, {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

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
      this.restaurantId = this.route.snapshot.paramMap.get('id') ?? ""; // Ojo con esta lógica, asegúrate que sea el param correcto
    } else {
      this.restaurantId = this.route.snapshot.paramMap.get('restaurantId')
        || this.route.snapshot.paramMap.get('id')
        || "";
    }

    this.categories = await this._categoryService.getCategories();
    
    if (this.isEditMode && this.currentProductId) {
      try {
        
        const product: any = await this._productService.getProductById(Number(this.currentProductId));
        
        this.productForm.patchValue({
          ...product,
          labels: ["None"]
        });
        
        this.cdr.detectChanges();
      } catch (error) {
        this.errorEnBack = true;
      }
    }
  }

  async saveProduct() {
    if (this.productForm.invalid) return;

    

    try {
      let response;

      if (this.isEditMode && this.currentProductId) {
        response = await this._productService.updateProduct(this.currentProductId, this.productForm.value);
      } else {
        response = await this._productService.createProduct(this.restaurantId, this.productForm.value);
      }

      this.isLoading = false;
      
      
      this.router.navigate(["/menu", this.restaurantId]);
      
      this.cdr.detectChanges();

    } catch (e) {
      this.isLoading = false;
      this.errorEnBack = true;
    }
  }
}