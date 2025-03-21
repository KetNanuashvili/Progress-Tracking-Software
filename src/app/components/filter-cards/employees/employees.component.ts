import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeesService } from '../../../services/emploesss/employees.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent  implements OnInit {
    employees: any[] = []; // თანამშრომლების სია
    selectedEmployees: number[] = []; // არჩეული თანამშრომლების ID-ს მასივი
    @Output() selectedEmployeesChange = new EventEmitter<number[]>(); // მშობელთან არჩევანის გადასაცემად
    @Output() closeCardEvent = new EventEmitter<void>(); // ბარათის დახურვისთვის
  
    constructor(private employeesService: EmployeesService) {}
  
    ngOnInit(): void {
      this.loadEmployees();
    }
  
    loadEmployees(): void {
      this.employeesService.getEmployees(0).subscribe( // Change 0 to a specific department ID if required
        (data: any[]) => {
          this.employees = data;
        },
        (error) => {
          console.error('Error fetching employees:', error);
        }
      );
    }
  
    onEmployeeSelect(employeeId: number): void {
      const index = this.selectedEmployees.indexOf(employeeId);
      if (index === -1) {
        this.selectedEmployees.push(employeeId); // Add employee if not already selected
      } else {
        this.selectedEmployees.splice(index, 1); // Remove if already selected
      }
      console.log('Selected Employees:', this.selectedEmployees);
    }
  
    onSubmit(): void {
      this.selectedEmployeesChange.emit(this.selectedEmployees); // Pass selected employees to parent
      this.closeCardEvent.emit(); // Close the card
      console.log('Employees Submitted:', this.selectedEmployees);
    }
  }
  




