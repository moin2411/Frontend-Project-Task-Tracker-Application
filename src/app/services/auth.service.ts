import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) {} 

  //Register User
  register(user: { username: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  //Login User
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
  
          //Decode JWT correctly
          const decodedToken: any = jwtDecode(response.token);
          localStorage.setItem('userRole', decodedToken.role); 
        }
      })
    );
  }
  

  //Save Token to LocalStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  saveId(id: number): void {
    localStorage.setItem('userId', String(id));
  }
  saveRole(role: string): void {
    localStorage.setItem('userRole', role);
  }
  //Get Token from LocalStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole'); 
  }
  
  getUserId(): number {
    return Number(localStorage.getItem('userId')) || 0; 
  }
  //Logout User
  logout(): void {
    localStorage.removeItem('token');
  }

  //Helper Function
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken(); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '' 
    });
  }
  
}
