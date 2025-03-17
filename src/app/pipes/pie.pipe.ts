import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat',
  standalone: true 
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return ''; // Handle null or empty value

    // Format the date if it is valid
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
