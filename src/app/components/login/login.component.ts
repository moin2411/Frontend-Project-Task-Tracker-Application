import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.authService.saveId(response.userId);
        this.authService.saveRole(response.userRole);
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
