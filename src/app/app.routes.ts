import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './features/recipe/recipe-detail/recipe-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },
    { path: '**', redirectTo: '/recipes' }
];
