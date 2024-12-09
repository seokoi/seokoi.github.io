import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: any[] = [];
  constructor(private router: Router) {}
  getCustomer(email: any, pass: any) {
    return this.customers.find(
      (item) => item.email == email && item.password == pass
    );
  }
  AddCustomer(form: any) {
    this.customers.push(form.value);
    this.router.navigate(['login']);
    console.log('mang', this.customers);
  }
}
