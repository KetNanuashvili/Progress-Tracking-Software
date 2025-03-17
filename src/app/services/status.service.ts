import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Status {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrl = 'https://momentum.redberryinternship.ge/api/statuses';

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl).pipe(
      map((statuses) =>
        statuses.map((status) => ({
          ...status,
          name: decodeURIComponent(status.name.replace(/\\u[\dA-F]{4}/gi, function(match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/, ''), 16));
          }))
        }))
      ),
      catchError((error) => {
        console.error('ბაზასთან დაკავშირების შეცდომა:', error);
        throw new Error('მონაცემების მიღება ვერ მოხერხდა.');
      })
    );
  }
}

