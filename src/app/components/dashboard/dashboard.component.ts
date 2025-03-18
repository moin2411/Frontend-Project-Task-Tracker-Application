import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTasks: number = 0;
  inProgressTasks: number = 0;
  completedTasks: number = 0;
  tasks: any[] = [];
  userRole: string | null = '';
  projectId: number = 0;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserTasks();
    this.userRole = this.authService.getUserRole(); 
  }

  loadUserTasks(): void {
      this.dashboardService.getUserTasks().subscribe({
      next: (response) => {
        this.tasks = response;
        this.totalTasks = this.tasks.length;
        this.inProgressTasks = this.tasks?.filter(task => task.status === 'IN_PROGRESS')?.length || 0;
        this.completedTasks = this.tasks?.filter(task => task.status === 'COMPLETED')?.length || 0;
        
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  navigateToProjects(): void {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/projects']);
    }
  }

  navigateToTaskTracker(): void {
    this.router.navigate(['/task-tracker']);
  }
  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';  
  }
  
}
