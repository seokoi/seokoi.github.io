import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit{
  userList: User[] = [];
  formUser = new FormGroup({
    id: new FormControl<string>(''),
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    role: new FormControl<string>(''),
  });

  constructor(private userService: UserService) { }
  IsAdd: number = 0;
  IsUpdate: number = 0;
  currentIndex: number | null = null;

  ngOnInit(): void {
    this.loadUserList();
  }
  loadUserList(): void {
    this.userService.getUserAll().subscribe(res => {
      this.userList = res;
    });
  }
  Add(): void {
    this.userService.AddUser(this.formUser.value).subscribe(() => {
      this.loadUserList(); // Cập nhật lại danh sách người dùng
      this.formUser.reset(); // Xóa trắng form
      this.IsAdd = 0;
    });
  }

  Update(): void {
    if (this.currentIndex !== null) {
      const id = this.currentIndex;
      if (id !== null) {
        this.userService.UpdateUser(id, this.formUser.value).subscribe(() => {
          this.loadUserList(); // Cập nhật lại danh sách người dùng
          this.formUser.reset(); // Xóa trắng form
          this.currentIndex = null;
          this.IsUpdate = 0; // Đặt lại trạng thái cập nhật
        });
      }
    }
  }
  Edit(id: any): void {
    // Tìm người dùng dựa trên id
    const selectedUser = this.userList.find(user => user.id === id);

    if (selectedUser) {
      // Kiểm tra và thiết lập giá trị vào form, xử lý các trường hợp null/undefined
      this.formUser.setValue({
        id: selectedUser.id.toString()  ,
        username: selectedUser.username || '',
        email: selectedUser.email || '',
        password: selectedUser.password || '',
        role: selectedUser.role || '',
      });

      // Cập nhật chỉ số hiện tại với ID của người dùng
      this.currentIndex = id;
      this.IsAdd = 0;
      this.IsUpdate = 2;
    } else {
      console.error("Không tìm thấy người dùng với ID:", id);
    }
  }


  // Phương thức xóa người dùng
  Delete(id: number): void {
    this.userService.DeleteUser(id).subscribe(() => {
      this.loadUserList(); // Cập nhật lại danh sách người dùng
    });
  }
}
