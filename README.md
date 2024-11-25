# Angular E-Commerce Application

This is a full-fledged **E-Commerce application** built with Angular, providing functionalities like product listing, cart management, order history, and authentication. The app is designed to handle user interaction with product filtering, search, dynamic cart updates, and order management, all while connecting to a backend server with **JSON Server** for data storage.

## Features

- **Product Listing**: Dynamically display products filtered by categories.
- **Product Search**: Implement a search bar for product names.
- **Pagination**: Navigate through products with paginated views.
- **Cart Management**: Add, remove, and update products in the cart with live quantity and price updates.
- **Order Management**: Users can place orders, which get saved with product IDs, quantities, and total prices.
- **Order History**: Display all previous orders made by the user.
- **Authentication**: Secure user login with a backend service for user management.
- **Responsive Design**: The application is fully responsive and optimized for all screen sizes.

## Project Structure

```
/src
  /app
    /components
      /cart          -- Cart management page
      /header        -- Navigation bar
      /home          -- Home page with product listing
      /login         -- Login page
      /order-history -- Page to display order history
      /pagination    -- Component for paginated navigation
    /services
      /auth.service  -- Authentication service
      /cart.service  -- Cart management service
      /order-history.service -- Order history management
      /product.service -- Product data handling service
    /models
      /product.model.ts -- Product model structure
      /order.model.ts   -- Order model structure
```

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (LTS version)
- **Angular CLI** (installed globally)
- **npm** (Node Package Manager)

### Steps to Install and Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-angular-app.git
   cd ecommerce-angular-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install JSON Server** (For running the backend):
   ```bash
   npm install -g json-server
   ```

4. **Start the JSON server**:
   Add a `db.json` file in the root directory, which will act as a mock backend for the application. Then run:
   ```bash
   json-server --watch db.json
   ```
   This will start the backend at `http://localhost:3000`.

5. **Run the Angular application**:
   ```bash
   ng serve
   ```
   This will run the Angular application at `http://localhost:4200`.

### Accessing the Application

- Go to `http://localhost:4200` in your browser to start using the application.

## Features in Detail

### Product Listing and Filtering
The homepage lists all the products with filtering options based on category. Users can filter the products dynamically by selecting a category.

### Product Search
Users can search for products by name, which will be displayed in real-time as they type in the search bar.

### Pagination
The application supports pagination to manage large numbers of products, providing a better user experience when browsing items.

### Cart Management
The cart page allows users to add products, increase/decrease quantities, and remove items. The cart is updated dynamically as changes are made.

### Order Management
Once the user confirms their order, the cart is cleared, and the order details are saved in the backend with a total price and products list.

### Order History
Users can view all their previous orders along with product details, quantities, and total prices. The order history is accessible after login.

### Authentication
The application supports user authentication. Users can log in with their credentials (which are stored in the backend `db.json`). Only authenticated users can view the cart and order history.

## Backend (JSON Server)

The backend is simulated using **JSON Server** and stores the following data:

- **Products**: Product details including name, price, category, and stock.
- **Orders**: List of orders with associated products, quantities, total price, and status.

You can modify `db.json` to add/remove products or orders as needed.

## Technologies Used

- **Frontend**: Angular (18.2.12)
  - Angular CLI, Components, Services, Routing, Forms, RxJS
  - Material Design (optional, for UI enhancements)
- **Backend**: JSON Server
  - Mock API with endpoints for products and orders
- **Authentication**: Basic authentication through Angular services
- **UI Design**: Custom CSS for the layout, responsive design for all screen sizes

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides a good overview of the project, its setup, and usage. You can customize it further as needed. Let me know if you need anything else!
