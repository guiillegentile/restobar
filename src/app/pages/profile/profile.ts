import { Component, inject, OnInit, viewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile-service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  router = inject(Router);
  profileService = inject(ProfileService);
  errorEnBack = false;
  isLoading = false;
  isEditMode = true; 
  form = viewChild<NgForm>('profileForm');

  profileData = {
    restaurantName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: ''
  };

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    try {
      const data = await this.profileService.getMyProfile();

      this.form()?.setValue({
        restaurantName: data.restaurantName,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        password: '' 
      });

    } catch (error) {
      console.error(error);
      this.errorEnBack = true;
    }
  }

  async updateProfile(form: NgForm) {
    if (form.invalid) return;

    this.errorEnBack = false;
    this.isLoading = true;

    try {
      const dataToSend = { ...form.value };

      const res = await this.profileService.updateUser(dataToSend);

      if (!res) {
        this.errorEnBack = true;
        this.isLoading = false;
        return;
      }

      alert('Perfil actualizado correctamente');

    } catch (error) {
      this.errorEnBack = true;

    } finally {
      this.isLoading = false;
    }
  }

  async deleteAccount() {
    const confirmacion = prompt('Para confirmar escribí "ELIMINAR" en mayúsculas:');

    if (confirmacion !== 'ELIMINAR') {
      if (confirmacion !== null) alert('Texto incorrecto. No se eliminó la cuenta.');
      return;
    }

    this.isLoading = true;

    try {
      await this.profileService.deleteMyAccount();
      localStorage.clear();
      this.router.navigate(['/login']);

    } catch (e) {
      alert('No se pudo eliminar la cuenta.');

    } finally {
      this.isLoading = false;
    }
  }
}
export interface UserProfile {
  restaurantName: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  password?: string; 
}