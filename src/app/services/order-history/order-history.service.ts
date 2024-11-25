import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from '../../order.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
private apiUrl = `http://localhost:3000/orders`; // Backend URL

  constructor(private http: HttpClient) {}

  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createOrder(userId: number, products: { productId: number, quantity: number }[], totalPrice: number): Observable<Order> {
    const order = {
      userId,
      products,
      totalPrice,
      status: 'completed',
      orderDate: new Date().toISOString()
    };
    return this.http.post<Order>(this.apiUrl, order);
  }
}
