import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterData, UsersService } from '../../services/users-services';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, Spinner, ReactiveFormsModule],
  templateUrl: './register-client.html',
  styleUrl: './register-client.css'
})
export class RegisterPage {
  errorRegister = false;
  usersService = inject(UsersService);
  isLoading = false;
  router = inject(Router);
  cdr = inject(ChangeDetectorRef)


  registerForm = new FormGroup({
    restaurantName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    phoneNumber: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  });


  async onSubmit() {
    this.isLoading = true;
    const rawValue = this.registerForm.getRawValue();
    try {
      this.isLoading = false
      await this.usersService.register(rawValue);
      this.router.navigate(["/login-owner"])
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error)
      this.isLoading = false
      this.cdr.detectChanges();
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

}