import { Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {CartComponent} from './components/cart/cart.component';
import {LoginComponent} from './components/login/login.component';
import {OrderHistoryComponent} from './components/order-history/order-history.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent},
  { path: 'cart', component: CartComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'order-history', component: OrderHistoryComponent,canActivate: [AuthGuard]}
];
