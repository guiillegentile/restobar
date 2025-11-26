import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from "../../services/auth-service";
import { Spinner } from "../../components/spinner/spinner";

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, Spinner, RouterLink],
  templateUrl: './login-client.html',
  styleUrl: './login-client.css'
})

export class LoginPage {
  router = inject(Router);
  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;
//funcion asincrona para el login del cliente
  async login(form:any){
    console.log(form.value)
    this.errorLogin = false;
    if(!form.value.email || !form.value.password){
      this.errorLogin = true;
      return
    }
    localStorage.setItem('role', 'client');
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
    this.errorLogin = true;
    this.router.navigate(['/restaurant-page']);
  }
}
