import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  //Getters---------------------------------------------------------------------------------

  get isInvalid() {
    return !this.loginForm.username
      || !this.loginForm.password
      || this.loginForm.password.length < 8;
  }

  //Methods---------------------------------------------------------------------------------

  login() {
    if (this.loginForm.username === 'admin' && this.loginForm.password === '12345678') {
      localStorage.setItem('isLogged', 'true');
      this.router.navigate(['ecbot']);
    } else {
      this.toastr.error('Usuario o contraseña incorrectos');
    }
  }

}
