import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';


@Component({
selector: 'app-login-owner',
standalone: true,
imports: [CommonModule, RouterModule, ReactiveFormsModule],
templateUrl: './login-owner.component.html',
styleUrls: ['./login-owner.component.css']
})
export class LoginOwnerComponent {
loading = false;
error: string | null = null;
redirectUrl: string | null = null;


form = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.minLength(4)]]
});


constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, route: ActivatedRoute) {
this.redirectUrl = route.snapshot.queryParamMap.get('redirect');
}


submit() {
if (this.form.invalid) { this.form.markAllAsTouched(); return; }
this.loading = true; this.error = null;
const { email, password } = this.form.value as { email: string; password: string };
const ok = this.auth.loginDueno(email, password);
this.loading = false;
if (!ok) { this.error = 'Credenciales inválidas'; return; }
this.router.navigate([this.redirectUrl || '/owner']);
}
}
