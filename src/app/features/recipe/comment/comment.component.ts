import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment, CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() canDelete: boolean = false;
  
  private commentService = inject(CommentService);
  
  deleteComment(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.commentService.deleteComment(this.comment.id);
    }
  }
}