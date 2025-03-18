import { Component, OnInit } from '@angular/core';
import { CustomDateFormatPipe } from '../../pipes/pie.pipe';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrioritatesService } from '../../services/priorite/prioritates.service';
import { DepartmentsService } from '../../services/departaments/departaments.service';
import { CreateTasksService } from '../../services/createTasks/create-tasks.service';
import { EmployeesService } from '../../services/emploesss/employees.service';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, CustomDateFormatPipe, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  selectedDate: string = '';
  statuses: any[] = [];
  selectedStatus: number | null = null;
  priorities: any[] = [];
  departments: any[] = [];
  selectedDepartment: number | null = null;
  employees: any[] = [];
  tomorrowDate: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  constructor(
    private statusService: StatusService,
    private prioritatesService: PrioritatesService,
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private createTasksService: CreateTasksService,
    private employeesService: EmployeesService
  ) {
    this.assignmentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [this.minWordsValidator(4), Validators.maxLength(255)]],
      department: ['', Validators.required],
      responsibleEmployee: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      deadline: [this.tomorrowDate, Validators.required]
    });
  }

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
      },
      error: (err) => {
        alert('სტატუსების მიღება ვერ მოხერხდა.');
      }
    });

    this.prioritatesService.getPriorities().subscribe({
      next: (data) => {
        this.priorities = data;
      },
      error: (err) => {
        alert('პრიორიტეტების მიღება ვერ მოხერხდა.');
      }
    });

    this.departmentsService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (err) => {
        alert('დეპარტამენტების მიღება ვერ მოხერხდა.');
      }
    });
  }

  onDepartmentChange(event: Event): void {
    const departmentId = +(event.target as HTMLSelectElement).value;
    this.selectedDepartment = departmentId;
    this.loadEmployees(departmentId);
  }

  loadEmployees(departmentId: number) {
    this.employeesService.getEmployees(departmentId).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.employees = data;
        } else {
          alert('ამ დეპარტამენტში არ არიან თანამშრომლები.');
        }
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        alert('არ მოხერხდა თანამშრომლების გაწერა.');
      }
    });
  }
  

  minWordsValidator(minWords: number) {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      const words = control.value.trim().split(/\s+/).length;
      return words >= minWords ? null : { minWords: true };
    };
  }

  onSubmit(): void {
    if (this.assignmentForm.valid) {
      // Convert form values
      const taskData = {
        title: this.assignmentForm.value.title,
        description: this.assignmentForm.value.description,
        department: +this.assignmentForm.value.department, // convert to number
        responsibleEmployee: +this.assignmentForm.value.responsibleEmployee, // convert to number
        priority: +this.assignmentForm.value.priority, // convert to number
        status: +this.assignmentForm.value.status, // convert to number
        deadline: this.assignmentForm.value.deadline
      };
  
      // Log task data to check its correctness
      console.log('Task Data:', taskData);
  
      // Call the service to create the task
      this.createTasksService.createTask(taskData).subscribe({
        next: () => {
          alert('დავალება წარმატებით დაემატა!');
          this.assignmentForm.reset();
        },
        error: (err) => {
          console.error('Task creation failed:', err);
          alert('დავალების შექმნის დროს მოხდა შეცდომა.');
        }
      });
    } else {
      alert('გთხოვ, შეავსე ყველა სავალდებულო ველი სწორად!');
    }
  }
  
  
  
  
  
}
