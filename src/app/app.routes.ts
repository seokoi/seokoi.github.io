import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerLoginComponent } from './auth/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', component:HomeComponent,title: 'Home'},
    {path:'list', component:ProductListComponent,title: 'Product'},
    {path:'cart/:id', component: CartComponent, title: 'Cart'},
    {path:'login', component:CustomerLoginComponent, title: 'login'},
    {path:'admin', component:AdminLoginComponent, title: 'admin'},
    {path:'register', component:CustomerRegisterComponent, title: 'register customer'},
    {path:'dashboard', component:DashboardComponent, title: 'dashboard', canActivate: [authGuard],
         children:[{
            path:'list', component:ProductListComponent,title: 'Product'
        },
        {path:'user-list', component:UserListComponent, title: 'user-list'}
    ]
    }
];
