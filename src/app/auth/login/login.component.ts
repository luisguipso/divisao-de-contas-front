import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.username || !this.password) {
      this.loginError = 'Preencha usuário e senha!';
      throw new Error(this.loginError);
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        if (this.authService.isLoggedIn()) {
          this.router.navigate(['/']);
        } else {
          this.loginError = 'Usuário ou senha incorreta.';
        }
      },
      error: (error) => (this.error = error),
    });
    console.log(this.authService.loginResponse?.accessToken);
  }

  cadastrarNovoUsuario() {
    //TODO
    console.log('/TODO cadastrar novo usuario');
  }
}
