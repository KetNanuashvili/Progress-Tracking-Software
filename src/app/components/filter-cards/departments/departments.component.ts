import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DepartmentsService } from '../../../services/departaments/departaments.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
export interface Department {
  id: number;
  name: string;
}
@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})

export class DepartmentsComponent implements OnInit{
  departments: Department[] = [];
  selectedDepartments: number[] = []; // Array to hold selected department IDs
  @Output() selectedDepartmentsChange = new EventEmitter<number[]>();
  @Output() closeCardEvent = new EventEmitter<void>();// EventEmitter to send signal to parent

  
  constructor(private departmentsService:DepartmentsService){

  }

  ngOnInit() {
    this.loadDepartments();
  }

   loadDepartments() {
    this.departmentsService.getDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }


  getDepartmentColor(departmentId: number): string {
    switch (departmentId) {
      case 1:
        return '#FD9A6A'; // Example color for department 1
      case 2:
        return '#FF66A8'; // Example color for department 2
      case 3:
        return '#89B6FF'; // Example color for department 3
      case 4:
        return '#FFD86D'; // Example color for department 4
      case 5:
        return '#FD9A6A'; // Example color for department 5
      case 6:
        return '#FF66A8'; // Example color for department 6
      case 7:
        return '#89B6FF'; // Example color for department 7
      default:
        return '#cccccc'; // Default color if departmentId is not found
    }
  }

  onDepartmentSelect(departmentId: number) {
    // Toggle the department selection
    const index = this.selectedDepartments.indexOf(departmentId);
    if (index === -1) {
      this.selectedDepartments.push(departmentId); // Add to selected if not already selected
    } else {
      this.selectedDepartments.splice(index, 1); // Remove if already selected
    }
  }

  onSubmit(): void {
    // Emit the selected departments to the parent
    this.selectedDepartmentsChange.emit(this.selectedDepartments);
    
    // Emit event to close the card
    this.closeCardEvent.emit();
    console.log('Card Close Event Emitted');
  }
}
