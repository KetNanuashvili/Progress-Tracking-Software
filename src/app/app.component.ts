import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CommonModule } from '@angular/common';
import { CreateAnEmployeeComponent } from './components/create-an-employee/create-an-employee.component';
import { CreateAssignmentComponent } from './components/create-assignment/create-assignment.component';
import { CustomDateFormatPipe } from './pipes/pie.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainPageComponent, CommonModule, CreateAnEmployeeComponent,CreateAssignmentComponent, CustomDateFormatPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
