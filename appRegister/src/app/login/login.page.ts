import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/servicios/api.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  iniciarSesion() {
    this.apiService.login(this.email, this.password).subscribe(
        () => {
          this.router.navigate(['inicio']);
        },
        error => {
          console.error('Error al iniciar sesión:',error);
          // Manejar errores de autenticación aquí
        }
      );
  }
}
