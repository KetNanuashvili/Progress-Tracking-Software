import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDetailService } from '../../services/view-detail.service';
import { CommonModule } from '@angular/common';
import { StatusService } from '../../services/status.service';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments/comments.service';
interface Comment {
  id: number;
  parent_id: number;
  text: string;
  task_id: string;
  sub_comments: Comment[]; // Recursively defines sub-comments
  author_avatar: string;
  author_nickname: string;
}
@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})
export class ViewDetailComponent implements OnInit {
  task: any = null;
  statuses: any[] = [];
  comments: any[] = [];
  newComment: string = '';
  newChildComment: string = ''; // For child comments
  replyToCommentId: number | null = null;
  activeParentCommentId: number | null = null;

  constructor(private route: ActivatedRoute,
              private viewDetailService: ViewDetailService,
              private statusService: StatusService,
              private commentsService: CommentsService) {}

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.fetchTaskDetails(taskId);
      this.fetchComments(taskId); // Add this line to load comments automatically
    }
  }

  fetchTaskDetails(id: string): void {
    this.viewDetailService.getTaskById(id).subscribe({
      next: (response) => {
        this.task = response;
        console.log('მიღებული დავალება:', this.task);
      },
      error: (err) => {
        console.error('შეცდომა მონაცემების ჩატვირთვისას:', err);
      }
    });
  }

  onStatusChange(event: Event): void {
    const selectedStatusId = (event.target as HTMLSelectElement).value;
    this.task.statusId = selectedStatusId;
    console.log('არჩეული სტატუსი:', selectedStatusId);
  }

  fetchComments(taskId: string): void {
    this.commentsService.getComments(taskId).subscribe({
      next: (data) => {
        this.comments = data; // Updated comments
        console.log('Comments fetched:', this.comments);
      },
      error: (err) => console.error('Error fetching comments:', err)
    });
  }

  addComment(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId && this.newComment.trim()) {
      this.commentsService.postComment(taskId, this.newComment, this.replyToCommentId || undefined).subscribe({
        next: () => {
          this.newComment = '';
          this.replyToCommentId = null;
          this.fetchComments(taskId); // Refresh comments
        },
        error: (err) => console.error('კომენტარის დამატება ვერ მოხერხდა:', err)
      });
    }
  }

  toggleReplyField(commentId: number): void {
    const comment = this.comments.find(c => c.id === commentId);
  
    if (comment) {
      // ამოწმებს, აქვს თუ არა უკვე რეფლაი დედა კომენტარზე
      const hasReply = comment.sub_comments.some((sub: { parent_id: number; }) => sub.parent_id === commentId);
  
      if (hasReply) {
        // თუ რეფლაი უკვე არსებობს, ის აღარ დაამატოს
        alert('ამ კომენტარზე უკვე არის რეფლაი!');
        return;
      }
  
      // თუ არ არსებობს რეფლაი, მაშინ დაამატეთ რეფლაი
      this.activeParentCommentId = this.activeParentCommentId === commentId ? null : commentId;
    }
  }
  
  
  addChildComment(parentCommentId: number): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId && this.newChildComment.trim()) {
      const parentComment = this.comments.find(c => c.id === parentCommentId);
  
      if (parentComment) {
        // ვამოწმებთ, აქვს თუ არა მშობელ კომენტარს `parent_id`
        if (parentComment.parent_id) {
          alert('რეფლაიზე რეფლაი არ არის ნებადართული!');
          return;
        }
  
        // თუ მშობელი კომენტარია და რეფლაი ჯერ არ არსებობს:
        this.commentsService.postComment(taskId, this.newChildComment, parentCommentId).subscribe({
          next: () => {
            this.newChildComment = '';
            this.fetchComments(taskId); // განახლდება კომენტარები
            this.activeParentCommentId = null; // ველის დახურვა
          },
          error: (err) => console.error('Reply failed:', err)
        });
      }
    }
  }
  
  
  
}
