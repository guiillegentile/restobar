import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { UserProfile } from "../pages/profile/profile";

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private _apiUrl = 'https://w370351.ferozo.com/api/users';
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

    async getMyProfile(): Promise<UserProfile> {
        try {
            return await firstValueFrom(
                this._httpClient.get<UserProfile>(`${this._apiUrl}/${this.getUserIdFromToken()}`)
            );

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteMyAccount() {
        try {
            return await firstValueFrom(this._httpClient.delete(`${this._apiUrl}/${this.getUserIdFromToken()}`, { headers: this.getHeaders() }));
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

async updateUser(data: any) {
    try {
        const userId = this.getUserIdFromToken();
        const url = `${this._apiUrl}/${userId}`; 
        return await firstValueFrom(
            this._httpClient.put(url, data, { headers: this.getHeaders() })
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}
}