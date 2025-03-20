import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { CreateAnEmployeeComponent } from './components/create-an-employee/create-an-employee.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { CustomDateFormatPipe } from './pipes/pie.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './components/filter-cards/departments/departments.component';
import { PrioritiesFilterComponent } from './components/filter-cards/priorities-filter/priorities-filter.component';
import { ViewDetailComponent } from './components/view-detail/view-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  
    RouterOutlet, 
    HeaderComponent, 
    MainPageComponent, 
    CommonModule, 
    CreateAnEmployeeComponent,
    CreateAssignmentComponent, 
    CustomDateFormatPipe,
    HttpClientModule, 
    ReactiveFormsModule ,
    DepartmentsComponent,
    PrioritiesFilterComponent,
    ViewDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
