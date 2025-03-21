import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../services/status.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { DepartmentsComponent } from '../filter-cards/departments/departments.component';
import { PrioritiesFilterComponent } from '../filter-cards/priorities-filter/priorities-filter.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EmployeesComponent } from '../filter-cards/employees/employees.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule,DepartmentsComponent, PrioritiesFilterComponent,RouterModule, EmployeesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  activeButton: string = '';
  statusesWithItems: { id: number; name: string; items: any[] }[] = [];
  allTasks: any[] = [];
  showDepartments: boolean = false;
  isPriorityCardOpen: boolean = false; 
  showPriorities: boolean = false;
  selectedDepartments: number[] = [];
  isCardOpen: boolean = false;
  isEmployeeCardOpen: boolean = false;
  selectedEmployees: number[] = [];

  selectedPriorities: number[] = [];

  getDepartmentColor(departmentId: number): string {
    switch (departmentId) {
      case 1:
        return '#FD9A6A'; // ადმინისტრაციის დეპარტამენტი
      case 2:
        return '#FF66A8'; // ადამიანური რესურსების დეპარტამენტი
      case 3:
        return '#89B6FF'; // ფინანსების დეპარტამენტი
      case 4:
        return '#FFD86D'; // გაყიდვები და მარკეტინგის დეპარტამენტი
      case 5:
        return '#FD9A6A'; // ლოჯოსტიკის დეპარტამენტი
      case 6:
        return '#FF66A8'; // ტექნოლოგიების დეპარტამენტი
      case 7:
        return '#89B6FF'; // მედიის დეპარტამენტი
      default:
        return '#cccccc'; // დეფოლტური ფერი
    }
  }
  
  constructor(  private statusService: StatusService,
    private tasksService:TasksService, 
    private router: Router
   ){

  }
 

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe({
      next: (statuses) => {
        this.tasksService.getTasks().subscribe({
          next: (tasks) => {
            this.allTasks = tasks; // Store all tasks
            this.statusesWithItems = statuses.map((status) => ({
              ...status,
              items: this.getItemsByStatusId(status.id, tasks), // Use all tasks to map statuses
            }));
          },
          error: (err) => {
            console.error('Error fetching tasks:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error fetching statuses:', err);
      },
    });
  }
  
  
  // დავალებების სტატუსის მიხედვით გამორჩევა
  getItemsByStatusId(statusId: number, tasks: any[]): any[] {
    return tasks.filter((task) => 
      task.status.id === statusId &&
      (this.selectedDepartments.length === 0 || this.selectedDepartments.includes(task.department.id)) &&
      (this.selectedPriorities.length === 0 || this.selectedPriorities.includes(task.priority.id)) &&
      (this.selectedEmployees.length === 0 || this.selectedEmployees.includes(task.employee.id))
    );
  }


  onDepartmentsChange(selectedDepartments: number[]) {
    this.selectedDepartments = selectedDepartments;
    this.updateFilteredTasks();
  }

  updateFilteredTasks(): void {
    this.statusesWithItems = this.statusesWithItems.map(status => ({
      ...status,
      items: this.getItemsByStatusId(status.id, this.allTasks)
    }));
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'დასაწყები':
        return '#F7BC30';
      case 'პროგრესში':
        return '#FB5607';
      case 'მზად ტესტირებისთვის':
        return '#FF006E';
      case 'დასრულებული':
        return '#3A86FF';
      default:
        return '#cccccc';
    }
  }
  getPriorityColor(priorityId: number): string {
    switch (priorityId) {
      case 1:
        return '#08A508'; 
      case 2:
        return '#FFBE0B'; 
      case 3:
        return '#FA4D4D'; 
      default:
        return '#0000FF'; // ცისფერი (default)
    }
  }
  
  
  changeStyle(button: string) {
    // Toggle the active button and visibility of the components
    if (this.activeButton === button) {
      this.activeButton = '';  // Reset if clicked on the same button
      if (button === 'department') {
        this.showDepartments = false;  // Hide DepartmentsComponent
      }
      if (button === 'priority') {
        this.showPriorities = false;  // Hide PrioritiesComponent
      }
    } else {
      this.activeButton = button;  // Set active button to the clicked one
      if (button === 'department') {
        this.showDepartments = true;  // Show DepartmentsComponent
        this.showPriorities = false;  // Hide PrioritiesComponent when department is selected
      } else if (button === 'priority') {
        this.showPriorities = true;  // Show PrioritiesComponent
        this.showDepartments = false;  // Hide DepartmentsComponent when priority is selected
      }
    }
  }
  

  dropdownVisible: boolean = false;
  closeCard(): void {
    this.isCardOpen = false; // Close the card
    console.log("Card is closed");
  }
  toggleCardVisibility(): void {
    this.isCardOpen = !this.isCardOpen;
    console.log('Card visibility toggled:', this.isCardOpen);
  }
  viewDetails(taskId: string): void {
    this.router.navigate(['/view-details', taskId]);
  }
  toggleDropdown() {
    this.isCardOpen = !this.isCardOpen;
    console.log('Dropdown visibility toggled:', this.isCardOpen);
  }


  togglePriorityCard(): void {
    this.isPriorityCardOpen = !this.isPriorityCardOpen;
    console.log('Priority card toggled:', this.isPriorityCardOpen);
  }

  onPrioritiesChange(selectedPriorities: number[]): void {
    this.selectedPriorities = selectedPriorities;
    console.log('Selected priorities updated:', this.selectedPriorities);
    this.updateFilteredTasks();
  }

  toggleEmployeeCard(): void {
    this.isEmployeeCardOpen = !this.isEmployeeCardOpen;
    console.log('Employee card toggled:', this.isEmployeeCardOpen);
  }

  onEmployeesChange(selectedEmployees: number[]): void {
    this.selectedEmployees = selectedEmployees;
    console.log('Selected Employees:', this.selectedEmployees);
    this.updateFilteredTasks();
  }
  
}