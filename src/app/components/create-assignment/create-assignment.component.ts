import { Component, OnInit } from '@angular/core';
import { CustomDateFormatPipe } from '../../pipes/pie.pipe';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PrioritatesService } from '../../services/priorite/prioritates.service';
import { DepartmentsService } from '../../services/departaments/departaments.service';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, CustomDateFormatPipe, FormsModule , RouterModule, HttpClientModule ,ReactiveFormsModule],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.css'
})
export class CreateAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;

  selectedDate: string = '';
  statuses: any[] = [];
  selectedStatus: number | null = null;
  priorities: any[] = [];  // Store priorities
  departments: any[] = []; // Array to store the departments
  selectedDepartment: number | null = null;
  employees: any[] = [];
  tomorrowDate: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];


  constructor(
    private statusService: StatusService, 
    private prioritatesService: PrioritatesService, 
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private http: HttpClient,
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
        console.log('მიღებული სტატუსები:', data);
        this.statuses = data; // უკვე გაშიფრული ტექსტი
      },
      error: (err) => {
        console.error('შეცდომა სტატუსების მიღებისას:', err);
        alert('სტატუსების მიღება ვერ მოხერხდა.');
      }
    });



    this.prioritatesService.getPriorities().subscribe({
      next: (data) => {
        console.log('მიღებული პრიორიტეტები:', data);
        this.priorities = data; // Set the priorities
      },
      error: (err) => {
        console.error('შეცდომა პრიორიტეტების მიღებისას:', err);
        alert('პრიორიტეტების მიღება ვერ მოხერხდა.');
      }
    });



    this.departmentsService.getDepartments().subscribe({
      next: (data) => {
        console.log('მიღებული დეპარტამენტები:', data);
        this.departments = data;
      },
      error: (err) => {
        console.error('შეცდომა დეპარტამენტების მიღებისას:', err);
        alert('დეპარტამენტების მიღება ვერ მოხერხდა.');
      }
    });
  }


  onDepartmentChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const departmentId = target.value;
    this.selectedDepartment = +departmentId; // Convert string to number
  
    this.http.get(`https://momentum.redberryinternship.ge/api/employees?departmentId=${departmentId}`)
      .subscribe({
        next: (data: any) => { 
          this.employees = data;
        },
        error: (err) => { 
          console.error('თანამშრომლის შეცდომა:', err); 
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
      const taskData = this.assignmentForm.value;
      this.http.post('https://momentum.redberryinternship.ge/api/tasks', taskData, {
        headers: { Authorization: 'Bearer 9e749d14-d67d-4206-b380-3383ddf3d2c8' }
      }).subscribe({
        next: () => {
          alert('დავალება წარმატებით დაემატა!');
          // Redirect to assignments page
        },
        error: (err) => {
          console.error('დავალების შექმნის შეცდომა:', err);
        }
      });
    }
  }
  }

  
  

