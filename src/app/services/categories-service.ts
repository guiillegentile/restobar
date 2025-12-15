import { inject, Injectable } from "@angular/core";

export interface Category {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private _apiUrl = 'https://w370351.ferozo.com/api';

  private getHeaders(): HeadersInit {
    const rawToken = localStorage.getItem('token');
    const token = rawToken ? rawToken.replace(/"/g, '') : '';
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payloadPart = token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      return payload.sub;
    } catch {
      return null;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const userId = this.getUserIdFromToken();
      if (!userId) throw new Error('Usuario no identificado');

      const res = await fetch(
        `${this._apiUrl}/users/${userId}/categories`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getAllCategories(id: number): Promise<Category[]> {
    try {
      const res = await fetch(
        `${this._apiUrl}/users/${id}/categories`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async createCategory(name: string) {
    try {
      const res = await fetch(
        `${this._apiUrl}/categories`,
        {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify({ name })
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editCategory(id: string, name: string) {
    try {
      const res = await fetch(
        `${this._apiUrl}/categories/${id}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify({ name })
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      const res = await fetch(
        `${this._apiUrl}/categories/${id}`,
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();   // Return the response JSON if needed
      // return res.ok;  // Or simply return true if deletion was successful

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}