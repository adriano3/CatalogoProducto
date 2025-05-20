import { Injectable } from '@angular/core';
import {Product} from '../Model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart : Product[]=[];
addToCart(product:Product){
  this.cart.push(product);
  console.log('Producto Agregado: ${product.name}');
}
removeFromCart(productId: number){
  this.cart = this.cart.filter(product => product.id !== productId);
  console.log('producto eliminado, Id: ${productId}');
}
getCartItems(): Product[]{
  return this.cart;
}
}
