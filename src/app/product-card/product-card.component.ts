import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Model/Product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() id!: number;
@Input() name:string='';
 @Input() imageUrl: string = '';
 @Input() price: number = 0;
 @Input() description: string = '';
  @Output() productClicked: EventEmitter<number> = new EventEmitter<number>(); // 🔥 Evento para ir a detalles
  @Output() addToCartClicked: EventEmitter<number> = new EventEmitter<number>(); // 🔥 Evento para agregar al carrito

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate([`/producto/${this.id}`]); //  Redirige a la página de detalles
  }

  addToCart() {
    this.addToCartClicked.emit(this.id); //  Envía el ID para agregarlo al carrito
  }
}
