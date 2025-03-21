import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/employees';
  private token = '9e7c4422-da28-4144-b24f-fcde2abfddf9';

  constructor(private http: HttpClient) { }

  createEmployee(employeeData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    // NOTE: აქ Content-Type-ის მითითება არ არის საჭირო, რადგან ბრაუზერი ავტომატურად დააყენებს `multipart/form-data`
    return this.http.post<any>(this.apiUrl, employeeData, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }
  
  
}
