import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
  this.loginForm = this.fb.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
  });
  }
  onSubmit() {
  console.log(this.loginForm.value)
  this.authService.loginCustomer(this.loginForm)
  }
  
}
