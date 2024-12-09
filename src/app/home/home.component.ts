import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';
import { ProductListComponent } from "../product-list/product-list.component";
import { ProductsService } from '../products.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductListComponent, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] = [];
  filterProductList: Product[]=[]
  constructor(private prod: ProductsService){
   prod.getProductAll().subscribe(res=>{
       this.products= res
       this.filterProductList = this.products;
    })

  }
  searching:string=''
  filterResults(){
    if(!this.searching){
      this.filterProductList=this.products
    }
    this.filterProductList=this.products.filter(
      item=>item.productName.toLowerCase().includes(this.searching.toLowerCase()))
  }
}
