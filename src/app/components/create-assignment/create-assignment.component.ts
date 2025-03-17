import { Component } from '@angular/core';
import { CustomDateFormatPipe } from '../../pipes/pie.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, CustomDateFormatPipe, FormsModule ],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.css'
})
export class CreateAssignmentComponent {


  // This value will display the formatted date using the pipe
  selectedDate: string = '';
}
