import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks';
  private token = '9e7c4422-da28-4144-b24f-fcde2abfddf9';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
