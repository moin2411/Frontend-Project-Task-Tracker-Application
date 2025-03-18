import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css']
})
export class TaskManagementComponent implements OnInit {
  tasks: any[] = [];
  newTask: any = { 
    name: '', 
    description: '', 
    priority: 'MEDIUM', 
    dueDate: '', 
    status: 'NOT_STARTED',
    userId: null,
    projectId: null,
    version: 0,
  };
  selectedTask: any = null;
  isEditing: boolean = false;

  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

   loadTasks() {
      this.taskService.getAllTasks().subscribe({
        next: (response) => {
          this.tasks = response;
        },
        error: (error) => {
          console.error('Error fetching user tasks:', error);
        }
      });
    }

  createTask() {
    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        alert('Task created successfully!');
        this.loadTasks();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    });
  }

  // Edit a task
  editTask(task: any) {
    this.selectedTask = { ...task };
    this.isEditing = true;
  }

  // Update task
  updateTask() {
    if (!this.selectedTask) return;

    this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe({
      next: () => {
        alert('Task updated successfully!');
        this.loadTasks();
        this.cancelEdit();
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          alert('Task deleted successfully!');
          this.loadTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedTask = null;
  }

  resetForm() {
    this.newTask = { name: '', description: '', priority: 'MEDIUM', dueDate: '', status: 'NOT_STARTED', userId: null, projectId: null };
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ADMIN';  
  }
  
}