import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { LoginResponse } from '../domain/loginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username?: string;
  password?: string;
  loginError?: string;
  error?: {};

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    if (!this.username || !this.password)
      throw new Error('Preencha usuário e senha!');
    this.loginService.login(this.username, this.password).subscribe({
      next: (data) => {
        if (this.loginService.isLoggedIn()) {
          this.router.navigate(['/']);
        } else {
          this.loginError = 'email or password is incorrect.';
        }
      },
      error: (error) => (this.error = error),
    });
    console.log(this.loginService.loginResponse?.accessToken);
  }

  cadastrarNovoUsuario() {
    //TODO
    console.log('/TODO cadastrar novo usuario');
  }
}
