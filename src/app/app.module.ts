import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { TaskTrackerComponent } from './components/task-tracker/task-tracker.component';  


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TaskManagementComponent,
    ProjectManagementComponent,
    TaskTrackerComponent 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
