import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient, private injector: Injector) {}
  private getAuthService(): AuthService {
    return this.injector.get(AuthService); 
  }
  //Get all projects (Admins only)
  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  //Get project by ID (Admins & Users)
  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  //Create a project (Admin only)
  createProject(project: any): Observable<any> {
    return this.http.post(this.baseUrl, project, { headers: this.getAuthHeaders() });
  }

  //Update a project (Admin only)
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, project, { headers: this.getAuthHeaders() });
  }

  //Delete a project (Admin only)
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  //Helper Function: Get Headers with Token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getAuthService().getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
