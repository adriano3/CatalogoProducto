import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError, switchMap } from 'rxjs';
import { Product } from '../Model/Product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
private apiUrl = 'https://fakestoreapi.com/products'; //  URL de la API
 private cartUrl = 'https://fakestoreapi.com/carts';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl).pipe(
    catchError(error => {
      console.error('Error al obtener productos:', error);
      return throwError(() => new Error('No se pudieron cargar los productos.'));
    })
  );
}
getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`).pipe(
      catchError(error => {
        console.error('Error al obtener producto:', error);
        return throwError(() => new Error('No se pudo obtener el producto.'));
      })
    );
  }
getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.cartUrl}/1`).pipe( // Fake Store API usa ID de usuario fijo
      catchError(error => {
        console.error('Error al obtener carrito:', error);
        return throwError(() => new Error('No se pudo obtener el carrito.'));
      })
    );
  }
addToCart(productId: number): Observable<any> {
    return this.http.post<any>(this.cartUrl, {
      userId: 1, // Fake Store API necesita un ID de usuario (puede ser dinámico en el futuro)
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
        const updatedCart = cart.products.filter((p: any) => p.productId !== productId); // 🔥 Filtra el producto a eliminar
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
/*
    private products : Product [] = [
    {
      id: 1,
      name: 'Tennis Vazza original',
      imageUrl: 'https://vazza.com.mx/cdn/shop/files/1384392_1.jpg?v=1735145644&width=1000',
      price: 180,
      description: 'Calzado cómodo y elegante para toda ocasión'
    },
    {
      id: 2,
      name: 'Tennis Blanco - Negro',
      imageUrl: 'https://i5.walmartimages.com/asr/6ee9aa23-ae07-453c-9e48-9d4935bb3147.1afad84866698012f4d90598dcbb6500.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      price: 300,
      description: 'Diseño moderno con excelente durabilidad'
    },
    {
      id: 3,
      name: 'Zapatillas Beis - Blanco',
      imageUrl: 'https://media.falabella.com/falabellaCO/126336429_01/w=1500,h=1500,fit=pad',
      price: 210,
      description: 'Perfecto para deporte y uso diario'
    }
  ];

  getProducts() {
    return this.products; // Retorna la lista de productos
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id); // Busca un producto por su ID
  }
  getCartItems(): Product[] {
    const cartData = localStorage.getItem('cart')
    return cartData ? JSON.parse(cartData): [];
  }

  //  Método para agregar productos al carrito
 addToCart(product: Product) {
  const cart = this.getCartItems();
  const existingProduct = cart.find(p => p.id === product.id);

  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 0) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

  removeFromCart(productId: number) {
    let cart = this.getCartItems().filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  } */

