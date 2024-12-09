import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Product } from './product';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lab7';
  
}
