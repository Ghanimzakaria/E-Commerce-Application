import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = 'http://localhost:3000/cart'; // URL pour la collection "cart"

  constructor(private http: HttpClient) {}

  // Ajouter un produit au panier
  addToCart(productId: number): Observable<any> {
    return this.http.get<any[]>(this.cartUrl).pipe(
      switchMap((cartItems) => {
        const item = cartItems.find((i) => i.productId === productId);

        if (item) {
          // Si l'article existe, on met à jour la quantité
          return this.http.patch(`${this.cartUrl}/${item.id}`, {
            quantity: item.quantity + 1,
          });
        } else {
          // Sinon, on ajoute un nouvel article
          return this.http.post(this.cartUrl, { productId, quantity: 1 });
        }
      })
    );
  }

  // Obtenir les produits du panier
  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl);

  }
  // Update the quantity of a cart item
  updateCartQuantity(cartItemId: any, newQuantity: number): Observable<any> {
    console.log(cartItemId)
    return this.http.patch(`${this.cartUrl}/${cartItemId}`, { quantity: newQuantity });
  }

  // Remove an item from the cart
  removeFromCart(cartItemId: any): Observable<any> {
    return this.http.delete(`${this.cartUrl}/${cartItemId}`);
  }

}
