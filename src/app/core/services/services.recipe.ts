import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SercicesService {

  constructor() { }

  http = inject(HttpClient);
 //https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

  getAllRecipe():Observable<any>{
    return this.http.get(`https://www.themealdb.com/api/json/v1/1`);
   
    // this.recipesListe.forEach(meal => console.log(meal.strMeal));

    }

    filterParCategories(categorie : string):Observable<any>{
     return this.http.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${categorie}`)
    }

  getRecipeDetailById():Observable<any>{
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
  }  
  


  }

