import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() name:string='';
 @Input() imageUrl: string = '';
 @Input() price: number = 0;
 @Input() description: string = '';
 @Output() productClicked: EventEmitter<any> = new EventEmitter<any>();
  notifySelection() {
    this.productClicked.emit({
      imageUrl: this.imageUrl,
      price: this.price,
      description: this.description
    });
  }
}
