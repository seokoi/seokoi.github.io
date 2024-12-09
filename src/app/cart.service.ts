import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  updateCart(cartList: Cart[]) {
    throw new Error('Method not implemented.');
  }

  constructor(private prod: ProductsService) { }
  private cartList: Cart[] = []
  getCartAll() {
  return this.cartList
  }

addCart(frmProduct: any, quantity: number) {
  //code
  const itemCart = this.cartList.find(item=> item.id == frmProduct.productId)
  if(itemCart){
    itemCart.quantity += quantity
  }
  else{
    this.cartList.push({
      id: frmProduct.productId,
      name: frmProduct.productName,
      price: frmProduct.price,
      quantity: quantity,
      imageUrl: frmProduct.imageUrl
    })
  }
  if(frmProduct){
    frmProduct.stock -= quantity
  }
  }
  RemoveCart(index: number) {
  //code
  }
  DeleteAllCart() {
  //code
  }

}
