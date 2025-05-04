import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
//import { CommentService, Comment } from '../../core/services/comment.service';
//import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],//, CommentComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId: string = '';
  recipe: Recipe | null = null;
  loading: boolean = false;
  videoUrl: SafeResourceUrl | null = null;
  ingredients: { name: string, measure: string }[] = [];
  comments: Comment[] = [];
  
  // Pour le formulaire de commentaire
  userName: string = '';
  commentContent: string = '';
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  //private commentService = inject(CommentService);
  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      if (this.recipeId) {
        this.loadRecipeDetails();
        this.loadComments();
      }
    });
  }

  loadRecipeDetails(): void {
    this.loading = true;
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (response) => {
        if (response.meals && response.meals.length > 0) {
          this.recipe = response.meals[0];
          this.processVideoUrl();
          this.extractIngredients();
          this.loading = false;
        } else {
          this.handleRecipeNotFound();
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des détails de la recette:', error);
        this.loading = false;
        this.handleRecipeNotFound();
      }
    });
  }

  loadComments(): void {
   // this.commentService.getCommentsByRecipeId(this.recipeId).subscribe(comments => {
   //   this.comments = comments;
  //  });
  }

  processVideoUrl(): void {
    if (this.recipe?.strYoutube) {
      // Convertir l'URL YouTube en format embed
      const videoId = this.getYoutubeVideoId(this.recipe.strYoutube);
      if (videoId) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}`
        );
      }
    }
  }

  getYoutubeVideoId(url: string): string | null {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }

  extractIngredients(): void {
    this.ingredients = [];
    if (!this.recipe) return;

    // TheMealDB stocke les ingrédients dans les propriétés strIngredient1, strIngredient2, etc.
    // et les mesures dans strMeasure1, strMeasure2, etc.
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.recipe[`strIngredient${i}` as keyof Recipe] as string;
      const measure = this.recipe[`strMeasure${i}` as keyof Recipe] as string;

      if (ingredient && ingredient.trim() !== '') {
        this.ingredients.push({
          name: ingredient,
          measure: measure || ''
        });
      }
    }
  }

  handleRecipeNotFound(): void {
    // Rediriger vers la liste avec un message d'erreur
    this.router.navigate(['/recipes']);
  }

  addComment(): void {
   // if (this.userName.trim() && this.commentContent.trim()) {
   //   this.commentService.addComment(this.recipeId, this.userName, this.commentContent);
      // Réinitialiser le formulaire
   //   this.userName = '';
   //   this.commentContent = '';
  //  }
  }

  goBack(): void {
    this.router.navigate(['/recipes']);
  }
}