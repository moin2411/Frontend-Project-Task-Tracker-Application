import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'USER'; // Default Role is set 
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const user = { username: this.username, password: this.password, role: this.role };
  
    this.authService.register(user).subscribe({
      next: (response) => {
        try {
          // Handle both JSON & plain text responses
          const res = typeof response === 'string' ? { message: response } : response;
  
          if (res.message === 'User registered successfully') {
            alert('Registration successful! Redirecting to login...');
            this.router.navigate(['/login']);
          } else {
            alert('Registration failed: ' + (res.message || 'Unknown error'));
          }
        } catch (error) { 
          console.error('Registration Error:', error);
          alert('Unexpected response format. Please try again.');
        }
      },
      error: (error) => {
        console.error('Registration Error:', error);
        alert('Registration failed! ' + (error.error?.message || 'Please try again.'));
      }
    });
  }
}
