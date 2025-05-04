import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SercicesService } from '../../../core/services/services.recipe';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {


   recipeDetails : any[]=[];
  recipeDetailservice = inject(SercicesService);

  getDetailRecipe(){
    this.recipeDetailservice.getRecipeDetailById().subscribe(( res :any)=>{
    this.recipeDetails = res.meals;
    console.log(this.recipeDetails);
    })
  }
}
