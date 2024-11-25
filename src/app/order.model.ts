export interface Order {
  id: number;
  userId: number;
  products: { productId: number, quantity: number }[]; // List of product IDs and their quantities
  totalPrice: number;
  status: string; // 'completed' for now
  orderDate: string;
}
