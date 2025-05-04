import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Comment {
  id: number;
  recipeId: string;
  userName: string;
  content: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];
  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor() {
    // Charger les commentaires depuis le localStorage si disponibles
    const savedComments = localStorage.getItem('recipeComments');
    if (savedComments) {
      this.comments = JSON.parse(savedComments);
      this.commentsSubject.next(this.comments);
    }
  }

  // Récupérer tous les commentaires pour une recette
  getCommentsByRecipeId(recipeId: string): Observable<Comment[]> {
    this.commentsSubject.next(this.comments.filter(comment => comment.recipeId === recipeId));
    return this.commentsSubject.asObservable();
  }

  // Ajouter un commentaire
  addComment(recipeId: string, userName: string, content: string): void {
    const newComment: Comment = {
      id: Date.now(),
      recipeId,
      userName,
      content,
      date: new Date()
    };
    
    this.comments.push(newComment);
    this.saveComments();
    this.commentsSubject.next(this.comments.filter(comment => comment.recipeId === recipeId));
  }

  // Supprimer un commentaire
  deleteComment(commentId: number): void {
    const index = this.comments.findIndex(comment => comment.id === commentId);
    if (index !== -1) {
      const recipeId = this.comments[index].recipeId;
      this.comments.splice(index, 1);
      this.saveComments();
      this.commentsSubject.next(this.comments.filter(comment => comment.recipeId === recipeId));
    }
  }

  // Sauvegarder les commentaires dans le localStorage
  private saveComments(): void {
    localStorage.setItem('recipeComments', JSON.stringify(this.comments));
  }
}
