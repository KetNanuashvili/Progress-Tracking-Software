import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'https://momentum.redberryinternship.ge/api/tasks';

  constructor(private http: HttpClient) {}

  // Fetch comments related to a specific task using taskId
  getComments(taskId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${taskId}/comments`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer 9e7c4422-da28-4144-b24f-fcde2abfddf9'
      })
    });
  }

  // Post a comment (can be a reply to another comment if parentCommentId is provided)
  postComment(taskId: string, commentText: string, parentCommentId?: number): Observable<any> {
    const body = {
      text: commentText,
      parent_id: parentCommentId || null // უზრუნველყოფს, რომ null მნიშვნელობა წაიგზავნება, თუ parentCommentId არ არის განსაზღვრული
    };
  
    return this.http.post(`${this.apiUrl}/${taskId}/comments`, body, {
      headers: new HttpHeaders({
        Authorization: 'Bearer 9e7c4422-da28-4144-b24f-fcde2abfddf9'
      })
    });
  }
  
  
}

