import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../Model/Product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  product?: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
  const productId = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.getProductById(productId).subscribe({
    next: (data) => {
      this.product = data;
    },
    error: () => {
      console.error('Error al obtener el producto');
    }
  });
}

 addToCart(productId: number) {
  this.productService.addToCart(productId).subscribe({
    next: () => console.log('Producto agregado correctamente'),
    error: () => console.error('Error al agregar al carrito')
  });
}

}

