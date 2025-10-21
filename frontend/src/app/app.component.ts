import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="nav">
      <div class="brand">Turbovets · Task Manager</div>
      <div class="row">
        <a routerLink="/">Dashboard</a>
        <a routerLink="/login" style="margin-left: 10px;">Login</a>
      </div>
    </div>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}