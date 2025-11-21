import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu-service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-product.html',
  styleUrls: ['./new-product.scss']
})
export class NewProductPage {

  private route = inject(ActivatedRoute);
  private menuService = inject(MenuService);
  private router = inject(Router);

  restaurantId: string = '';

  constructor() {
    this.restaurantId = this.route.snapshot.params['id'];
  }

  addProduct(form: any) {
    if (form.invalid) return;

    this.menuService.addProductToMenu(this.restaurantId, form.value);

    // Volver al menú del restaurante
    this.router.navigate(['/menu', this.restaurantId]);
  }
}
