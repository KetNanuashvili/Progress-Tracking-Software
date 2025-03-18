import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTasksService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks';
  private token = '9e760d76-3cdc-42f9-a1b1-cc9f91cfa81b';

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
