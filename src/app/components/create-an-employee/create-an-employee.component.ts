import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-create-an-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-an-employee.component.html',
  styleUrl: './create-an-employee.component.css'
})
export class CreateAnEmployeeComponent {
  @Output() closeCard = new EventEmitter<void>();

  close() {
    this.closeCard.emit(); // გამოიძახებს ფუნქციას HeaderComponent-ში
  }

  imageUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  removeImage(): void {
    this.imageUrl = null;
  }


  selectedOption: string = '';  // or use undefined if you prefer

  // Method to handle option selection
  selectOption(option: string): void {
    this.selectedOption = option;
    console.log('Selected Option:', this.selectedOption); // Optional: log the selected option
  }

  // Method to toggle dropdown visibility (optional if you want to toggle it manually)
  toggleDropdown(): void {
    // Add logic to open/close dropdown if needed
  }
}
