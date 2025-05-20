import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
interface Product {
  id:number;
  name: string;
  imageUrl: string;
  price:number;
  description: string
}
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
 products:Product[]=[];
 constructor(private productService: ProductService, private cartService: CartService){}
 ngOnInit(){
  this.products = this.productService.getProducts();
 }
 addToCart( product: Product){
  this.productService.addToCart(product);
 }
  handleProductClick(selectedProduct: any) {
    console.log('Producto seleccionado:', selectedProduct);
    // Aquí puedes agregar lógica adicional, como mostrar detalles del producto,
    // agregar el producto a un carrito de compra, etc.
  }
}
