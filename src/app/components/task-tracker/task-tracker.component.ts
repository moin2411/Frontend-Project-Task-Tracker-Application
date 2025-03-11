import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; // ✅ Import Router


@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  tasks: any[] = [];
  userRole: string | null = '';

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Fetch user role
    this.loadTasks();

  }

  loadTasks(): void {
      this.taskService.getAllTasks().subscribe({
        next: (response) => {
        this.tasks = response;
        },
        error: (error) => {
          console.error('Error fetching tasks:', error);
        }
      });
  }

  updateTaskStatus(task: any, newStatus: string): void {
    task.status = newStatus; // Update status locally before sending to backend
    this.taskService.updateTask(task.id, { ...task, status: newStatus }).subscribe({
      next: () => {
        alert(`Task updated to ${newStatus} successfully!`);
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN'; // ✅ Check if logged-in user is ADMIN
  }
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  
  
  
}
