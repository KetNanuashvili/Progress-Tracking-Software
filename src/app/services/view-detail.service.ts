import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewDetailService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks'; // API ძირეული URL
  private token = '9e760d76-3cdc-42f9-a1b1-cc9f91cfa81b'; // თქვენი ტოკენი

  constructor(private http: HttpClient) {}

  // ფუნქცია კონკრეტული ID-ით დავალების მისაღებად
  getTaskById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}` // ტოკენი დამატებულია სათაურში
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers }); // GET მოთხოვნა
  }

  
}
