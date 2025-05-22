import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
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
export class CartComponent implements OnInit {
cartItems:Product[]= [];
cartCount: number=0;
errorMessage = '';
constructor(private cartService: CartService) {}
ngOnInit(){
  this.loadCart();
}
loadCart() {
    this.cartService.getCartItems().subscribe({
      next: (data) => {
        this.cartItems = data.products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity
        }));
        this.updateCartCount();
      },
      error: () => {
        this.errorMessage = 'Error al obtener el carrito.';
      }
    });
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
  this.cartService.removeFromCart(productId);
  this.loadCart();
}
saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

}
