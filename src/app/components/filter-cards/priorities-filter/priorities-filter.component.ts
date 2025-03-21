import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PrioritatesService } from '../../../services/priorite/prioritates.service';

export interface Priority {
  id: number;
  name: string;
}

@Component({
  selector: 'app-priorities-filter',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './priorities-filter.component.html',
  styleUrl: './priorities-filter.component.css'
})
export class PrioritiesFilterComponent implements OnInit {
  priorities: Priority[] = [];
  selectedPriorities: number[] = []; // Array to hold selected priority IDs
  @Output() selectedPrioritiesChange = new EventEmitter<number[]>();
  @Output() closeCardEvent = new EventEmitter<void>(); // Signal to close the card

  constructor(private prioritatesService: PrioritatesService) {}

  ngOnInit() {
    this.loadPriorities();
  }

  loadPriorities() {
    this.prioritatesService.getPriorities().subscribe(
      (data: Priority[]) => {
        this.priorities = data; // Load priorities data
      },
      (error) => {
        console.error('Error fetching priorities:', error);
      }
    );
  }

  onPrioritySelect(priorityId: number): void {
    const index = this.selectedPriorities.indexOf(priorityId);
    if (index === -1) {
      this.selectedPriorities.push(priorityId); // Add to selected priorities
    } else {
      this.selectedPriorities.splice(index, 1); // Remove if already selected
    }
  }

  onSubmit(): void {
    this.selectedPrioritiesChange.emit(this.selectedPriorities); // Emit selected priorities
    this.closeCardEvent.emit(); // Notify parent to close the card
    console.log('Selected Priorities Submitted:', this.selectedPriorities);
  }

  getPriorityColor(priorityId: number): string {
    switch (priorityId) {
      case 1:
        return '#08A508'; // Example color for priority 1
      case 2:
        return '#FFBE0B'; // Example color for priority 2
      case 3:
        return '#FA4D4D'; // Example color for priority 3
      default:
        return '#0000FF'; // Default color
    }
  }
}
