import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewDetailService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks'; // API ძირეული URL
  private token = '9e7c4422-da28-4144-b24f-fcde2abfddf9'; 
  constructor(private http: HttpClient) {}

  getTaskById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}` // ტოკენი დამატებულია სათაურში
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers }); // GET მოთხოვნა
  }

  
}
