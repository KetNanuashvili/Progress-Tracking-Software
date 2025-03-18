import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PrioritatesService } from '../../../services/priorite/prioritates.service';

@Component({
  selector: 'app-priorities-filter',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './priorities-filter.component.html',
  styleUrl: './priorities-filter.component.css'
})
export class PrioritiesFilterComponent {
  priorities: any[] = [];  // Define the priorities array

  constructor(private prioritatesService: PrioritatesService) {}

  ngOnInit() {
    if (!this.priorities.length) {
      this.loadPriorities(); // Only load if priorities aren't already provided
    }
  }

  loadPriorities() {
    this.prioritatesService.getPriorities().subscribe(
      (data: any[]) => {
        this.priorities = data; // Load priorities data
      },
      (error) => {
        console.error('Error fetching priorities:', error);
      }
    );
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
        return '#0000FF'; // Default color
    }
  }

  onPrioritySelect(priorityId: number) {
    console.log('Selected Priority ID:', priorityId);
    // Additional logic when a priority is selected
  }
  
}
