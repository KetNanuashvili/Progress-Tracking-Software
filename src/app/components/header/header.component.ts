import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAnEmployeeComponent } from '../create-an-employee/create-an-employee.component';
import { CreateAssignmentComponent } from '../create-assignment/create-assignment.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,CreateAnEmployeeComponent,CreateAssignmentComponent, RouterModule, HttpClientModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  openEmployeeCard = false;


  openEmployee() {
    this.openEmployeeCard = true;
  }

  closeEmployeeCard() {
    this.openEmployeeCard = false;
  }


}
