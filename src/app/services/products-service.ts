import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {

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


  async getProducts(): Promise<any> {
    try {
      const id = this.getUserIdFromToken();
      if (!id) throw new Error('Usuario no identificado');

      return await firstValueFrom(
        this._httpClient.get<any[]>(`${this._apiUrl}/users/${id}/products`)
      );

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

    async getProductById(id : number): Promise<any> {
    try {
  
      return await firstValueFrom(
        this._httpClient.get<any[]>(`${this._apiUrl}/products/${id}`)
      );

    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProductsById(id : number) {
    
    try {
      return await firstValueFrom(
        this._httpClient.get<any[]>(`${this._apiUrl}/users/${id}/products`)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getMyProducts(){
        try {
      return await firstValueFrom(
        this._httpClient.get<any[]>(`${this._apiUrl}/products/me`, { headers: this.getHeaders() })
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

    async createProduct(id : string, data: any) {
    try {
      return await firstValueFrom(
        this._httpClient.post<any[]>(`${this._apiUrl}/products`, data, { headers: this.getHeaders() }),
        
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProduct(id : string, data: any) {
        try {
      return await firstValueFrom(
        this._httpClient.put<any[]>(`${this._apiUrl}/products/${id}`, data, { headers: this.getHeaders() }),
        
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  
}

async deleteProduct(id : string) {
  try {
    return await firstValueFrom(
      this._httpClient.delete<any[]>(`${this._apiUrl}/products/${id}`, { headers: this.getHeaders() })
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}


  // async createProduct(name: string) {
  //   try {
  //     return await firstValueFrom(
  //       this._httpClient.post(
  //         `${this._apiUrl}/categories`, 
  //         { name }, 
  //         { headers: this.getHeaders() }
  //       )
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     throw error; 
  //   }
  // }



  // }

}
