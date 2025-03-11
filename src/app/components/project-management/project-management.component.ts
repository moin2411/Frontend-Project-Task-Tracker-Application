import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  projects: any[] = [];
  newProject: any = { name: '', description: '', startDate: '', endDate: '', status: 'Active' };
  selectedProject: any = null;
  isEditing: boolean = false;

  constructor(private projectService: ProjectService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProjects();
  } 

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  createProject() {
    this.projectService.createProject(this.newProject).subscribe({
      next: () => {
        alert('Project created successfully!');
        this.loadProjects();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }

  editProject(project: any) {
    this.selectedProject = { ...project };
    this.isEditing = true;
  }

  updateProject() {
    if (!this.selectedProject) return;
    this.projectService.updateProject(this.selectedProject.id, this.selectedProject).subscribe({
      next: () => {
        alert('Project updated successfully!');
        this.loadProjects();
        this.cancelEdit();
      },
      error: (error) => {
        console.error('Error updating project:', error);
      }
    });
  }

  deleteProject(projectId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          alert('Project deleted successfully!');
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedProject = null;
  }

  resetForm() {
    this.newProject = { name: '', description: '', startDate: '', endDate: '', status: 'IN_PROGRESS' };
  }
}
