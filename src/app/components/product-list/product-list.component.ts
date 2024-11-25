import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationComponent} from '../pagination/pagination.component';
import {CartService} from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  currentPage: number = 1; // Page actuelle
  productsPerPage: number = 5; // Nombre de produits par page
  paginatedProducts: any[] = []; // Produits affichés sur la page actuelle

  constructor(private productService: ProductService,
              private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filterProducts(); // Applique le filtre initial
    });
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories = ['All', ...data]; // Ajoute "All" pour inclure tous les produits
    })
  }

  filterProducts(): void {
    if (this.selectedCategory === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    }
    this.updatePagination();
  }

  updatePagination(): void {
  const startIndex = (this.currentPage - 1) * this.productsPerPage;
  const endIndex = startIndex + this.productsPerPage;
  this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
  onPageChange(page: number): void {
  this.currentPage = page;
  this.updatePagination();
  }


  addToCart(productId: number): void {
  this.cartService.addToCart(productId).subscribe(() => {
    alert('Produit ajouté au panier !');
  })
  }

}
