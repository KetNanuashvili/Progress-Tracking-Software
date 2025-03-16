import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CreateAnEmployeeComponent } from '../create-an-employee/create-an-employee.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,CreateAnEmployeeComponent],
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
