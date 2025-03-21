import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTasksService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks';
  private token = '9e7c4422-da28-4144-b24f-fcde2abfddf9';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(this.apiUrl, taskData, { headers }).pipe(
      tap((response) => {
        console.log('Task creation successful:', response);
      }),
      catchError((error) => {
        console.error('Task creation failed:', error);
        return throwError(error);
      })
    );
  }
  
  
}
