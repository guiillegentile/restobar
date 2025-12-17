import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categories-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {

  router = inject(Router);
  menuService = inject(MenuService);
  _categoryService = inject(CategoryService)
  cdr = inject(ChangeDetectorRef);

  categories: any[] = [];
  isEditing = false;
  categoryData = { id: '', name: '' };
  isLoading = false; 

  ngOnInit() {
    this.loadCategories();
  }

  async loadCategories() {
    this.isLoading = true; 

    try {
      this.categories = await this._categoryService.getCategories();

    } catch (error) {
      console.error('Hubo un error cargando las categorías:', error);
    } finally {this.cdr.detectChanges();
      this.isLoading = false;
    }
  }

  async saveCategory(form: any) {
    if (form.invalid) return;

    this.isLoading = true; 

    try {
      if (this.isEditing) {
        try {
          await this._categoryService.editCategory(this.categoryData.id, this.categoryData.name);
          
        } catch (error) {
          
        }finally{
          this.cdr.detectChanges();
        }
      } else {
        try {
          await this._categoryService.createCategory(this.categoryData.name);
          
        } catch (error) {
          
        }finally{
          this.cdr.detectChanges();
        }
      }
      this.cancelEdit();
      await this.loadCategories();

    } catch (error) {
      alert('Error al guardar la categoría. Verifique su conexión o sesión.');
    } finally {
      this.isLoading = false; 
    }
  }

  async deleteCategory(id: string) {
    if (!confirm('¿Seguro que deseas eliminar esta categoría?')) return;

    try {
      this.isLoading = true;
      await this._categoryService.deleteCategory(id);
      await this.loadCategories();
    } catch (error) {
      alert('No se pudo eliminar la categoría.');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
  selectCategoryToEdit(cat: any) {
    this.isEditing = true;
    this.categoryData = { ...cat };
  }
  cancelEdit() {
    this.isEditing = false;
    this.categoryData = { id: '', name: '' };
  }

} 
