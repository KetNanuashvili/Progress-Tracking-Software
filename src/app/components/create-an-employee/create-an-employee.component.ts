
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { DepartmentsService } from '../../services/departaments/departaments.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEmployeeService } from '../../services/createEmployee/create-employee.service';
@Component({
  selector: 'app-create-an-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-an-employee.component.html',
  styleUrl: './create-an-employee.component.css'
})
export class CreateAnEmployeeComponent {
  @Output() closeCard = new EventEmitter<void>();
  
  // Form Group for employee creation
  employeeForm: FormGroup;
  departments: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private createEmployeeService: CreateEmployeeService
  ) {
    // Initialize form group with validations
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      avatar: ['', Validators.required], // აქ სავალდებულოა
      department_id: ['', Validators.required] // პირდაპირ ID
    });
    
  }

  ngOnInit(): void {
    this.departmentsService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  // Close modal
  close() {
    this.closeCard.emit(); // Emits event to close the card
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const file = input.files[0]; // ფაილი პირდაპირ
      this.employeeForm.patchValue({ avatar: file }); // ატვირთვისთვის ემატება ფაილი
    }
  }
  
  
  

  // Remove selected image
  removeImage(): void {
    this.imageUrl = null;
    this.employeeForm.patchValue({ avatar: '' });
  }

  // Submit the form
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = new FormData();
      formData.append('name', this.employeeForm.get('name')?.value);
      formData.append('surname', this.employeeForm.get('surname')?.value);
      formData.append('avatar', this.employeeForm.get('avatar')?.value); // პირდაპირ ფაილი
      formData.append('department_id', this.employeeForm.get('department_id')?.value);
      console.log('FormData:', formData);

      this.createEmployeeService.createEmployee(formData).subscribe(
        (response: any) => {
          console.log('Employee created successfully:', response);
        },
        (error: any) => {
          console.error('Error response:', error.error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  
  
}
