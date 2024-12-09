import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Cart } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productDetail: Product | undefined;
  cartList: Cart[] = [];
  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService,
    private CartService: CartService
  ) {
    this.cartList = CartService.getCartAll();
  }
  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    this.productService.getProductID(id).subscribe(res=>{
       this.productDetail = res
    })
  }
  Add() {
    this.CartService.addCart(this.productDetail, 1);
  }
  ItemCount() {
    let sum = 0;
    this.cartList.forEach((item) => {
      sum += item.quantity;
    });
    return sum;
  }
  ItemSum() {
    let sum = 0;
    this.cartList.forEach((item) => {
      sum += item.quantity * item.price;
    });
    return sum;
  }
  Remove(index: number) {
    // Kiểm tra nếu index hợp lệ
    if (index > -1 && index < this.cartList.length) {
      // Xóa sản phẩm tại vị trí 'index' khỏi giỏ hàng
      this.cartList.splice(index, 1);
      // Cập nhật giỏ hàng sau khi xóa
      this.CartService.updateCart(this.cartList);
    }
  }
  DeleteAll() {
    // Xóa toàn bộ giỏ hàng
    this.cartList = [];
    // Cập nhật giỏ hàng sau khi xóa toàn bộ
    this.CartService.updateCart(this.cartList);
  }
}
