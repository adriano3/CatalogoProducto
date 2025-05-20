import { Component } from '@angular/core';
import { ProductService} from '../services/product.service';
import { Product } from '../Model/Product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
cartItems:Product[]= [];
cartCount: number=0;
constructor(private productService: ProductService){}
ngOnInit(){
  this.loadCart();
}
loadCart(){
  this.cartItems = this.productService.getCartItems();
  this.updateCartCount();
}
updateCartCount(){
  this.cartCount= this.cartItems.reduce((total, product) => total + (product.quantity || 1),0 )
}
increaseQuantity(product: Product) {
    product.quantity = (product.quantity || 1) + 1; 
    this.saveCart();
  }

  decreaseQuantity(product: Product) {
    if (product.quantity && product.quantity > 1) {
      product.quantity--;
      this.saveCart();
    }
  }
removeFromCart(productId:number){
  this.productService.removeFromCart(productId);
  this.loadCart();
}
saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

}
