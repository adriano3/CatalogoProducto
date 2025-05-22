import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
export const routes: Routes = [
  { path: '', component: ProductListComponent }, // 🔥 Esta ruta debe mostrar la lista de productos
  { path: 'cart', component: CartComponent },
  { path: 'producto/:id', component: ProductDetailComponent }
];
