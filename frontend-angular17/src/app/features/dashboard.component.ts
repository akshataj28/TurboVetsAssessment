import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

type Role = 'USER' | 'MANAGER' | 'ADMIN';
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'OK'|'WARN'|'BLOCKED';
  assigneeEmail?: string;
  createdAt?: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  template: `
  <div class="card">
    <h2>New Task</h2>
    <form (ngSubmit)="createTask()" class="row">
      <input class="input" [(ngModel)]="newTitle" name="title" placeholder="New task title" />
      <input class="input" [(ngModel)]="newDesc" name="description" placeholder="Description" />
      <select class="input" [(ngModel)]="newStatus" name="status">
        <option value="OK">OK</option>
        <option value="WARN">WARN</option>
        <option value="BLOCKED">BLOCKED</option>
      </select>
      <button class="btn">Add</button>
    </form>
  </div>

  <div class="card">
    <h2>Tasks</h2>
    <table class="table">
      <thead><tr><th>Title</th><th>Description</th><th>Status</th><th>Assignee</th><th>Actions</th></tr></thead>
      <tbody>
        <tr *ngFor="let t of tasks">
          <td>{{t.title}}</td>
          <td>{{t.description}}</td>
          <td><span class="badge {{t.status}}">{{t.status}}</span></td>
          <td>{{t.assigneeEmail || '—'}}</td>
          <td>
            <button class="btn" (click)="remove(t.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  newDesc = '';
  newStatus: Task['status'] = 'OK';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<Task[]>(`${environment.apiUrl}/tasks`).subscribe(res => this.tasks = res);
  }

  createTask() {
    const body = { title: this.newTitle, description: this.newDesc, status: this.newStatus };
    this.http.post<Task>(`${environment.apiUrl}/tasks`, body).subscribe(_ => {
      this.newTitle = ''; this.newDesc = ''; this.newStatus = 'OK'; this.load();
    });
  }

  remove(id: string) {
    this.http.delete(`${environment.apiUrl}/tasks/${id}`).subscribe(_ => this.load());
  }
}