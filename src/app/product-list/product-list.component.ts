import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../Model/Product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private router:Router) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

 searchProducts(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value; // 🔥 Cast explícito
  this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(inputValue.toLowerCase()));
}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  viewDetails(productId: number) {
   this.router.navigate([`/producto/${productId}`]);
  }
}
