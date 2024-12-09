import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { StarComponent } from './star/star.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../products.service';
import { log } from 'node:console';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [StarComponent, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  formProduct = new FormGroup({
    id: new FormControl<string>(''),
    productName: new FormControl<string>(''),
    productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    stock: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    imageUrl: new FormControl<string>(''),
  });
  ProductList: Product[] = [];
  constructor(private product: ProductsService) {
    product.getProductAll().subscribe((res) => {
      this.ProductList = res;
    });
  }
  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  ShowRating(value: any) {
    alert(`${value}`);
  }
  ngOnInit(): void {
    this.product.getProductAll().subscribe((res) => {
      this.ProductList = res;
    });
  }
  onChange(event: any) {
    let fileImage = event.target.files[0].name;
    this.file = 'assets/images/' + fileImage;
    this.formProduct.controls.imageUrl.setValue(this.file);
  }
  Add() {
    // this.formProduct.controls['id'].setValue(this.product.AutoID());
    const data = { ...this.formProduct.value };
    delete data.id;
    this.product.AddProduct(data).subscribe((res) => {
      this.ngOnInit();
      console.log('Add new', res);
    });
  }
  Edit(id: any) {
    this.product.getProductID(id).subscribe((res) => {
      this.formProduct.setValue(res);
    });
    //  this.formProduct.setValue(this.product.EditProduct(index))
    this.file = this.formProduct.controls.imageUrl.value ?? '';
  }
  Update() {
    this.product
      .UpdateProduct(
        this.formProduct.controls['id'].value,
        this.formProduct.value
      )
      .subscribe((res) => {
        this.ngOnInit();
        console.log('Update:', res);
      });
  }
  Delete(id: any) {
    if (confirm('Bạn có muốn xóa hay không')) {
      this.product.DeleteProduct(id).subscribe((res) => {
        this.ngOnInit();
        console.log('Delete:', res);
      });
    }
  }
}
