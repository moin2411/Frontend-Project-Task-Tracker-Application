import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { TaskTrackerComponent } from './components/task-tracker/task-tracker.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TaskManagementComponent },
  { path: 'projects', component: ProjectManagementComponent },
  { path: 'task-tracker', component: TaskTrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
