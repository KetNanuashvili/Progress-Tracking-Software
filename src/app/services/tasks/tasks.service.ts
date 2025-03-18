import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks';
  private token = '9e760d76-3cdc-42f9-a1b1-cc9f91cfa81b';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
