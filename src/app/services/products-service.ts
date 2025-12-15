import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Products {

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

  async getProducts(): Promise<any> {
    try {
      const id = this.getUserIdFromToken();
      if (!id) throw new Error('Usuario no identificado');

      const res = await fetch(`${this._apiUrl}/users/${id}/products`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<any> {
    try {
      const res = await fetch(`${this._apiUrl}/products/${id}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductsById(id: number) {
    try {
      const res = await fetch(`${this._apiUrl}/users/${id}/products`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMyProducts() {
    try {
      const res = await fetch(`${this._apiUrl}/products/me`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createProduct(id: string, data: any) {
    try {
      const res = await fetch(`${this._apiUrl}/products`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(id: string, data: any) {
    try {
      const res = await fetch(`${this._apiUrl}/products/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      const res = await fetch(`${this._apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // si tu backend no devuelve body, cambiá esto por: return res.ok;
      return await res.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}