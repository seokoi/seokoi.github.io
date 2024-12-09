import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  constructor(private auth: AuthService) { }
  email: string = '';
  password: string = '';
  onSubmit(form: NgForm) {
  this.auth.loginAdmin(form)
  }
}
