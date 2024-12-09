import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  protected Users: User[] = [];

  private URL = 'http://localhost:3000/User';
  getUserAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}`);
  }
  getUserId(id: number) {
    return this.http.get<User>(`${this.URL}/${id}`);
  }

  AddUser(newUser: any): Observable<User[]> {
    return this.http.post<User[]>(this.URL, newUser);
  }
  UpdateUser(id: number, frmUser: any): Observable<User[]> {
    return this.http.put<User[]>(`${this.URL}/${id}`, frmUser);
  }
  DeleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.URL}/${id}`);
    }


}
