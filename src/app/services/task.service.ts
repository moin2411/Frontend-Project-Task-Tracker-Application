import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  name: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  userId: number;
  projectId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks';
  private dashboardUrl = 'http://localhost:8080/api/dashboard'; 
  private baseUrlWithId = 'http://localhost:8080/api/tasks/1';
  constructor(private http: HttpClient) {}

  //Helper Function to Include Auth Headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  //Get all tasks (Admin only)
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  getUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/user`);
  }
  
  getUserTasksById(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }

  //Create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/createTask`, task, { headers: this.getAuthHeaders() });
  }

  //Update an existing task
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, { headers: this.getAuthHeaders() });
  }

  //Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  
}
