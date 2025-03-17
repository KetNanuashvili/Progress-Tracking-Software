import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrioritatesService {

  private apiUrl = 'https://momentum.redberryinternship.ge/api/priorities';

  constructor(private http: HttpClient) { }

  // Fetch priorities from the API
  getPriorities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
