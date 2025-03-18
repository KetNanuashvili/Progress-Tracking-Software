
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { DepartmentsService } from '../../services/departaments/departaments.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEmployeeService } from '../../services/createEmployee/create-employee.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-an-employee',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, RouterModule],
  templateUrl: './create-an-employee.component.html',
  styleUrl: './create-an-employee.component.css'
})
export class CreateAnEmployeeComponent {
  @Output() closeCard = new EventEmitter<void>();
  
  // Form Group for employee creation
  employeeForm: FormGroup;
  departments: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;
  imageError: string | null = null;

  constructor(
    private router: Router,
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
// Handle file selection
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input?.files?.[0]) {
    const file = input.files[0];

    // Size validation (600KB = 600 * 1024 bytes)
    const maxSize = 600 * 1024; // 600KB
    if (file.size > maxSize) {
      // Show validation error
      this.imageError = 'ფოტოს ზომა აღემატება 600KB-ს';
      this.imageUrl = null; // Reset image preview
      this.employeeForm.patchValue({ avatar: null }); // Clear form value
      return;
    }

    // If size is valid, read the file and set the preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result; // Update imageUrl with base64 string
      this.imageError = null; // Clear previous error (if any)
    };
    reader.readAsDataURL(file);

    // Update the form value
    this.employeeForm.patchValue({ avatar: file });
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
          alert('თანამშრომელი წარმატებით დაემატა!');
          this.router.navigate(['/main-page']).then(() => {
            console.log('ნავიგაცია შესრულდა');
            this.closeCard.emit(); // Emit the event to close the card
          });
        },
        (error: any) => {
          console.error('Error response:', error.error);
          alert('დაფიქსირდა შეცდომა თანამშრომლის დამატებისას. სცადეთ თავიდან.');
        }
      );
    } else {
      {
   Object.keys(this.employeeForm.controls).forEach(field => {
      const control = this.employeeForm.get(field);
      control?.markAsTouched(); // მონიშნოს ყველა ველი როგორც "ტუჩედ"
     
    });
      }
    }
  }
  
  

  
  onInputChange(): void {
    // წვდომა დინამიკაზე ტექსტების ფერის ცვლილებისთვის.
  }
  
  
}
