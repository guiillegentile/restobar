import { Injectable } from "@angular/core";
import { UserProfile } from "../pages/profile/profile";

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private _apiUrl = 'https://w370351.ferozo.com/api/users';

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


  async getMyProfile(): Promise<UserProfile> {
    try {
      const userId = this.getUserIdFromToken();

      const res = await fetch(
        `${this._apiUrl}/${userId}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async deleteMyAccount() {
    try {
      const userId = this.getUserIdFromToken();

      const res = await fetch(
        `${this._apiUrl}/${userId}`,
        {
          method: 'DELETE',
          headers: this.getHeaders()
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return res.ok;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

 
  async updateUser(data: any) {
    try {
      const userId = this.getUserIdFromToken();

      const res = await fetch(
        `${this._apiUrl}/${userId}`,
        {
          method: 'PUT',
          headers: this.getHeaders(),
          body: JSON.stringify(data)
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      return await res.json();

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}