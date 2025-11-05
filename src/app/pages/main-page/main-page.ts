import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth.service';


@Component({
selector: 'app-main-page',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './main-page.component.html',
styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
constructor(private router: Router, private auth: AuthService) {}


irCliente() {
this.auth.loginCliente();
this.router.navigate(['/restaurantes']); 
}


irDueno() {
this.router.navigate(['/login-owner']);
}
}