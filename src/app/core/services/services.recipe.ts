import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SercicesService {

  constructor() { }

  http = inject(HttpClient);
 

  getAllRecipe():Observable<any>{
    return this.http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`);
   
    // this.recipesListe.forEach(meal => console.log(meal.strMeal));

    }
  }

