import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbareComponent } from './shared/navbare/navbare.component';
import { HomeComponent } from './features/pages/home/home.component';
import { RecipeListComponent } from './features/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './features/recipe/recipe-detail/recipe-detail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbareComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'flavor_Shope';
}
