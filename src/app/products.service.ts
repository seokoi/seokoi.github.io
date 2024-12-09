import { Injectable, OnInit } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  protected productslist: Product[] = [];
  constructor(private http: HttpClient) {
    this.getProductAll().subscribe((res) => {
      this.productslist = res;
    });
  }

  getProductID(id: any) {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }
  AddProduct(frmProduct: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.baseURL}`, frmProduct);
  }
  private baseURL = 'http://localhost:3000/product';
  ngOnInit(): void {
    this.getProductAll().subscribe((res) => {
      this.productslist = res;
    });
  }
  AutoID() {
    this.ngOnInit();
    let max = 0;
    this.productslist.forEach((item) => {
      if (Number(item.id) > max) {
        max = Number(item.id);
      }
    });
    return (max + 1).toString();
  }
  getProductAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
  UpdateProduct(id: any, frmProduct: any): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.baseURL}/${id}`, frmProduct);
  }
  DeleteProduct(id: any): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.baseURL}/${id}`);
  }
}
