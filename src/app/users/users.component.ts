import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  view = 'list';
  users: any = [];
  dataSource: any = [];
  selectedUser: any = {};

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  options = {
    autoClose: true,
    keepAfterRouteChange: false
};

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getAllUsers('user').subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource)
    })
  }

  onSubmit() {
    if (this.view === 'add') {
    this.userService.addUser('user/signup', this.userForm.value).subscribe(res => {
      console.log(res)
      this.view = 'list';
      this.getAllUsers();
      this.alertService.success('The user has been added.', this.options)
    })
  } else {
    const userBody = [
      { "propName": "name", "value": this.userForm.value.name }
    ];
    this.userService.editUser('user/' + this.selectedUser._id, userBody).subscribe(res => {
      console.log(res)
      this.view = 'list';
      this.getAllUsers();
      this.alertService.success('The user has been updated.', this.options)
    })
  }
  }


  editUser(user) {
    this.userForm.controls.name.setValue(user.name);
    this.userForm.controls.email.setValue(user.email);
    this.userForm.controls.password.setValue(user.password);
    this.selectedUser = user;
    console.log(this.selectedUser)
    this.view = 'edit';
  }


  removeUser(user) {
    this.userService.deleteUser('user/' + user._id).subscribe(res => {
      console.log(res)
      this.getAllUsers();
      this.alertService.success('The user has been removed.', this.options)
    })
  }
}
