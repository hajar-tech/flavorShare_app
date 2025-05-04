import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strYoutube: string;
  strInstructions: string;
}

export interface RecipeResponse {
  meals: Recipe[];
}

export interface Category {
  strCategory: string;
}

export interface CategoryResponse {
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';
  private http = inject(HttpClient);

  constructor() { }

  // Récupérer toutes les recettes par nom (recherche vide = toutes les recettes)
  searchRecipes(query: string = ''): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.baseUrl}/search.php?s=${query}`);
  }

  // Récupérer les détails d'une recette par ID
  getRecipeById(id: string): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.baseUrl}/lookup.php?i=${id}`);
  }

  // Récupérer les recettes par catégorie
  getRecipesByCategory(category: string): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.baseUrl}/filter.php?c=${category}`);
  }

  // Récupérer toutes les catégories disponibles
  getAllCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/categories.php`);
  }
}