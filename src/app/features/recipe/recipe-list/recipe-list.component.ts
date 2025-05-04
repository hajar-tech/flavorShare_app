import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService, Recipe, Category } from '../../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  loading: boolean = false;
  
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadRecipes();
    this.loadCategories();
  }

  loadRecipes(): void {
    this.loading = true;
    this.recipeService.searchRecipes().subscribe({
      next: (response) => {
        this.recipes = response.meals || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des recettes:', error);
        this.loading = false;
      }
    });
  }

  loadCategories(): void {
    this.recipeService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.categories || [];
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  filterByCategory(): void {
    if (!this.selectedCategory) {
      this.loadRecipes();
      return;
    }
    
    this.loading = true;
    this.recipeService.getRecipesByCategory(this.selectedCategory).subscribe({
      next: (response) => {
        this.recipes = response.meals || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du filtrage par catégorie:', error);
        this.loading = false;
      }
    });
  }

  searchRecipes(): void {
    this.loading = true;
    this.recipeService.searchRecipes(this.searchQuery).subscribe({
      next: (response) => {
        this.recipes = response.meals || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la recherche:', error);
        this.loading = false;
      }
    });
  }

  viewRecipeDetail(recipeId: string): void {
    this.router.navigate(['/recipe', recipeId]);
  }
}