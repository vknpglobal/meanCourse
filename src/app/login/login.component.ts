import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loginUser('user/login', this.loginForm.value).subscribe(res => {
      if (res.statusCode === 200) {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.authService.isLoggedIn = true;
        this.router.navigate(['/users'])
      } else {
        console.log('User not found')
      }
    })
  }

}
