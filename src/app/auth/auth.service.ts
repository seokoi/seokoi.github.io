import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private customerService: CustomerService) { }
  isAuthenticated: boolean = false;
  loginAdmin(form: any) {
    if (
      form.controls['email'].value == 'admin@gmail.com' &&
      form.controls['password'].value == '123456789'
    ) {
      this.isAuthenticated = true;
      this.router.navigate(['dashboard']);
    } else {
      alert('login not success');
      this.isAuthenticated = false;
    }
  }
  loginCustomer(form: any) {
    const customer = this.customerService.getCustomer(form.controls['email'].value, form.controls['password'].value);
    if (customer) {
      this.isAuthenticated = true;
      this.router.navigate(['']);
    } else {
      alert('login not success');
      this.isAuthenticated = false;
    }
  }
}
