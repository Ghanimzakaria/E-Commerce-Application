import {Component, OnInit} from '@angular/core';
import {Order} from '../../order.model';
import {OrderHistoryService} from '../../services/order-history/order-history.service';
import {AuthService} from '../../services/auth/auth.service';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    CommonModule
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderHistoryService: OrderHistoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    this.orderHistoryService.getOrders(userId).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }
}
