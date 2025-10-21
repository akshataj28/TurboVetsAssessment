import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>Login</h2>
    <form (ngSubmit)="login()" class="row">
      <input class="input" [(ngModel)]="email" name="email" placeholder="Email" />
      <input class="input" [(ngModel)]="password" name="password" type="password" placeholder="Password" />
      <button class="btn">Login</button>
    </form>
    <div *ngIf="error" style="color:#ef4444; margin-top:6px;">{{error}}</div>
  </div>

  <div class="card">
    <h3>Or Register</h3>
    <form (ngSubmit)="register()" class="row">
      <input class="input" [(ngModel)]="email" name="email2" placeholder="Email" />
      <input class="input" [(ngModel)]="password" name="password2" type="password" placeholder="Password" />
      <select class="input" [(ngModel)]="role" name="role">
        <option>USER</option><option>MANAGER</option><option>ADMIN</option>
      </select>
      <button class="btn">Register</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  email = 'admin@example.com';
  password = 'password';
  role: 'USER'|'MANAGER'|'ADMIN' = 'USER';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = '';
    this.http.post<any>(`${environment.apiUrl}/auth/login`, { email: this.email, password: this.password })
      .subscribe({ 
        next: r => { localStorage.setItem('token', r.access_token); this.router.navigateByUrl('/'); },
        error: err => this.error = err?.error?.message ?? 'Login failed'
      });
  }
  register() {
    this.error = '';
    this.http.post<any>(`${environment.apiUrl}/auth/register`, { email: this.email, password: this.password, role: this.role })
      .subscribe({ 
        next: r => { localStorage.setItem('token', r.access_token); this.router.navigateByUrl('/'); },
        error: err => this.error = err?.error?.message ?? 'Register failed'
      });
  }
}