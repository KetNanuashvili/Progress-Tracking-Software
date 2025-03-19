import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusService } from '../../services/status.service';
import { PrioritatesService } from '../../services/priorite/prioritates.service';
import { DepartmentsService } from '../../services/departaments/departaments.service';
import { CreateTasksService } from '../../services/createTasks/create-tasks.service';
import { EmployeesService } from '../../services/emploesss/employees.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, RouterModule] ,
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  statuses: any[] = [];
  priorities: any[] = [];
  departments: any[] = [];
  employees: any[] = [];
  tomorrowDate: string;
 
  closeCard: any;

  constructor(
    private fb: FormBuilder,
    private statusService: StatusService,
    private prioritatesService: PrioritatesService,
    private departmentsService: DepartmentsService,
    private createTasksService: CreateTasksService,
    private employeesService: EmployeesService,
    private router: Router 
  ) {
    this.tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    this.assignmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: ['', [this.optionalDescriptionValidator(4), Validators.maxLength(255)]],
      due_date: [this.tomorrowDate, Validators.required],
      status_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      priority_id: ['', Validators.required]
    });
    
    this.assignmentForm.statusChanges.subscribe(() => {
      // ვალიდაციის გამოკითხვა ხდება რეალურ დროში
      console.log('Form Status:', this.assignmentForm.status);
    });
    
  }

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe({
      next: (data) => this.statuses = data,
      error: () => alert('სტატუსების მიღება ვერ მოხერხდა.')
    });

    this.prioritatesService.getPriorities().subscribe({
      next: (data) => this.priorities = data,
      error: () => alert('პრიორიტეტების მიღება ვერ მოხერხდა.')
    });

    this.departmentsService.getDepartments().subscribe({
      next: (data) => this.departments = data,
      error: () => alert('დეპარტამენტების მიღება ვერ მოხერხდა.')
    });
  }
  onDepartmentChange(event: Event): void {
    const departmentId = +(event.target as HTMLSelectElement).value; // გარდაქმნისას ვიყენებთ HTMLSelectElement-ს
    if (departmentId) {
      this.employeesService.getEmployees(departmentId).subscribe({
        next: (data) => {
          if (Array.isArray(data) && data.length > 0) {
            this.employees = data; // ივსება თანამშრომლების სია
          } else {
            this.employees = []; // ცარიელი სია, თუ თანამშრომლები არ მოიძებნა
            alert('ამ დეპარტამენტში თანამშრომლები არ მოიძებნა.');
          }
        },
        error: () => {
          this.employees = [];
          alert('შეცდომა თანამშრომლების გამოტანისას.');
        }
      });
    } else {
      this.employees = [];
    }
  }
  
  optionalDescriptionValidator(minWords: number) {
    return (control: AbstractControl) => {
      if (!control.value || control.value.trim() === '') {
        // თუ ველი ცარიელია, ვალიდაციის წარუმატებლობა არ მოხდება
        return null; 
      }
  
      // ტექსტის შემთხვევაში ამოწმებს სიტყვების რაოდენობას
      const wordCount = control.value.trim().split(/\s+/).length;
      return wordCount >= minWords ? null : { minWords: true }; 
    };
  }
  
  
  

  minWordsValidator(minWords: number) {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      return control.value.trim().split(/\s+/).length >= minWords ? null : { minWords: true };
    };
  }
  onSubmit(): void {
    if (this.assignmentForm.valid) {
      const taskData = this.assignmentForm.value;
  
      this.createTasksService.createTask(taskData).subscribe({
        next: () => {
          alert('დავალება წარმატებით დაემატა!');
          localStorage.removeItem('assignmentForm'); // ინფორმაცია წაიშლება მხოლოდ წარმატებულ შემთხვევაში
          this.assignmentForm.reset(); // ფორმის გასუფთავება
          this.router.navigate(['/main-page']).then(() => {
            console.log('ნავიგაცია შესრულდა');
            
          });
        },
        error: (err) => {
          console.error('შეცდომა:', err.error);
          alert('დავალების შექმნის დროს მოხდა შეცდომა.');
        }
      });
    } else {
      alert('გთხოვ, სწორად შეავსე ყველა სავალდებულო ველი!');
    }
  }
  
  
  
}
