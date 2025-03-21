import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'https://momentum.redberryinternship.ge/api/employees';
  private token = '9e7c4422-da28-4144-b24f-fcde2abfddf9';

  constructor(private http: HttpClient) {}

  getEmployees(departmentId: number): Observable<any[]> {
    const url = `${this.apiUrl}?departmentId=${departmentId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any[]>(url, { headers });
  }
  
}
