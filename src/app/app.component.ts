import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'; // Importa el componente padre
import { CartComponent } from './cart/cart.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./product-card/product-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductCardComponent,CartComponent], // IMPORTA el padre, que ya contiene ProductCardComponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

