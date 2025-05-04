import { Component, inject, OnInit } from '@angular/core';
import { SercicesService } from '../../../core/services/services.recipe';
import { CommonModule } from '@angular/common';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule,RecipeDetailComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit  {

  categorie :string=""
  

  recipeService = inject(SercicesService);
  recipeListes: any[] = [];
  ngOnInit(): void {
     
     this.recipeService.getAllRecipe().subscribe((res:any)=>{
       this.recipeListes = res.meals;
       console.log(this.recipeListes);
     })
    
  }

  filterRecipeByCtegories(){
    this.recipeService.filterParCategories(this.categorie).subscribe((res:any)=>{
      this.recipeListes = res.meals;
    })
  }
  

}



