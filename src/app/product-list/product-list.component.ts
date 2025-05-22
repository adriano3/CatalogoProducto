import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  errorMessage = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    console.log('Ejecutando ngOnInit()');
    this.loadProducts();
  }

  loadProducts() {
    console.log('Ejecutando loadProducts()');
  this.productService.getProducts().subscribe({
    next: (data) => {
      console.log('Productos recibidos:', data);
      this.products = data;
      this.filteredProducts = [...this.products]; // 🔥 Inicializar lista filtrada
      this.updatePagination(); // 🔥 Aplicar paginación
      console.log("Productos cargados:", this.products); // 🔹 Verifica en la consola si llegan los datos
    },
    error: (err) => {
      this.errorMessage = err.message;
      console.error('Error al cargar productos:', err);
    }
  });
}


  searchProducts(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  this.filteredProducts = this.products.filter((product) =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );
}
viewDetails(productId: number) {
    this.router.navigate([`/producto/${productId}`]); // 🔥 Redirige a la página de detalles
  }

   addToCart(productId: number) {
    this.productService.addToCart(productId).subscribe({
      next: () => console.log(`Producto ${productId} agregado al carrito`),
      error: () => console.error('Error al agregar producto al carrito')
    });
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.products.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.filteredProducts = this.products.slice(startIndex, endIndex); // 🔥 Pagina los productos localmente
}

}
