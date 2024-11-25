import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartService} from '../../services/cart/cart.service';
import {ProductService} from '../../services/product/product.service';
import {OrderHistoryService} from '../../services/order-history/order-history.service';
import {AuthService} from '../../services/auth/auth.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
              private productService: ProductService,
              private orderHistoryService: OrderHistoryService,
              private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.productService.getProducts().subscribe((products) => {
        this.cartItems = cartItems.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return {
            ...product,
            quantity: item.quantity,
            cartID: item.id
          };
        });
        this.calculateTotalPrice();
      });
    });
  }

  increaseQuantity(cartItem: any): void {
    this.cartService.updateCartQuantity(cartItem.cartID, cartItem.quantity + 1).subscribe(() => {
      cartItem.quantity++;
      this.calculateTotalPrice();
    });
  }

  decreaseQuantity(cartItem: any): void {
    if (cartItem.quantity > 1) {
      this.cartService.updateCartQuantity(cartItem.cartID, cartItem.quantity - 1).subscribe(() => {
        cartItem.quantity--;
        this.calculateTotalPrice();
      });
    } else {
      this.removeFromCart(cartItem);
    }
  }

  removeFromCart(cartItem: any): void {
    this.cartService.removeFromCart(cartItem.cartID).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.cartID !== cartItem.cartID);
      this.calculateTotalPrice();
    });
  }


  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }


  confirmOrder(): void {
    const userId = this.authService.getCurrentUserId();
    const products = this.cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

     // Create order
    this.orderHistoryService.createOrder(userId, products, this.totalPrice).subscribe(order => {
      for (let item of this.cartItems) {
        this.removeFromCart(item)
      }
    });

  }

}
