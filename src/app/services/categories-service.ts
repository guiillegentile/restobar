import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

export interface Category {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _apiUrl = 'https://w370351.ferozo.com/api';
  private _httpClient = inject(HttpClient);


  private getHeaders(): HttpHeaders {
    const rawToken = localStorage.getItem('token');
    const token = rawToken ? rawToken.replace(/"/g, '') : '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payloadPart = token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      return payload.sub;
    } catch (error) {
      return null;
    }
  }


  async getCategories(): Promise<Category[]> {
    try {
      const userId = this.getUserIdFromToken();
      
      if (!userId) throw new Error('Usuario no identificado');
      return await firstValueFrom(
        this._httpClient.get<Category[]>(`${this._apiUrl}/users/${userId}/categories`)
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllCategories(id: number) {
    try {

      return await firstValueFrom(
        this._httpClient.get<Category[]>(`${this._apiUrl}/users/${id}/categories`)
      );
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createCategory(name: string) {
    try {
      return await firstValueFrom(
        this._httpClient.post(
          `${this._apiUrl}/categories`,
          { name },
          { headers: this.getHeaders() }
        )
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async editCategory(id: string, name: string) {

    try {
      return await firstValueFrom(
        this._httpClient.put(
          `${this._apiUrl}/categories/${id}`,
          { name },
          { headers: this.getHeaders() }
        )
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async deleteCategory(id: string) {
    try {
      return await firstValueFrom(
        this._httpClient.delete(
          `${this._apiUrl}/categories/${id}`,
          { headers: this.getHeaders() }
        )
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}