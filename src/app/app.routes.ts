import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CreateAnEmployeeComponent } from './components/create-an-employee/create-an-employee.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { DepartmentsComponent } from './components/filter-cards/departments/departments.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full' }, 
  { path: 'main-page', component: MainPageComponent },
  { path: 'create-employee', component: CreateAnEmployeeComponent },
  { path: 'create-assignment', component: CreateAssignmentComponent },
  { path: 'departments-filter', component:DepartmentsComponent }
];
