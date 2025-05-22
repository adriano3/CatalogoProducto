import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Product} from '../Model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'https://fakestoreapi.com/carts';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.cartUrl}/1`).pipe(
      catchError(error => {
        console.error('Error al obtener carrito:', error);
        return throwError(() => new Error('No se pudo obtener el carrito.'));
      })
    );
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post<any>(this.cartUrl, {
      userId: 1,
      products: [{ productId: productId, quantity: 1 }]
    }).pipe(
      catchError(error => {
        console.error('Error al agregar producto al carrito:', error);
        return throwError(() => new Error('No se pudo agregar el producto al carrito.'));
      })
    );
  }

  removeFromCart(productId: number): Observable<any> {
    return this.getCartItems().pipe(
      catchError(error => {
        console.error('Error al obtener carrito:', error);
        return throwError(() => new Error('No se pudo obtener el carrito.'));
      }),
      switchMap(cart => {
        const updatedCart = cart.products.filter((p: any) => p.productId !== productId);
        return this.http.put<any>(`${this.cartUrl}/1`, { userId: 1, products: updatedCart }).pipe(
          catchError(error => {
            console.error('Error al actualizar carrito:', error);
            return throwError(() => new Error('No se pudo actualizar el carrito.'));
          })
        );
      })
    );
  }
}
