import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  activeButton: string = '';

  changeStyle(button: string) {
    if (this.activeButton === button) {
      this.activeButton = ''; // Reset if clicked on the same button
    } else {
      this.activeButton = button; // Set active button to the clicked one
    }
  }



  dropdownVisible: boolean = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
}
