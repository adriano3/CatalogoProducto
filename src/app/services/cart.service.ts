import { Injectable } from '@angular/core';
import {Product} from '../Model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getCartItems(): Product[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(product: Product) {
    const cart = this.getCartItems();
    const existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(productId: number) {
    let cart = this.getCartItems().filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
