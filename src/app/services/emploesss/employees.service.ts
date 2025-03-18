import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = 'https://momentum.redberryinternship.ge/api/employees';
  private token = '9e760d76-3cdc-42f9-a1b1-cc9f91cfa81b';

  constructor(private http: HttpClient) {}

  getEmployees(departmentId: number): Observable<any[]> {
    const url = `${this.apiUrl}?departmentId=${departmentId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.get<any[]>(url, { headers });
  }
  
}
