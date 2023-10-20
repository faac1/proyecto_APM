import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  
  constructor(private authService: AuthService) { }
  async cambiarContrasena() {
    try {
      if (this.nuevaContrasena === this.confirmarContrasena) {
        await this.authService.cambiarContrasena(this.nuevaContrasena);
        console.log('Contraseña cambiada exitosamente.');
      } else {
        console.log('Las contraseñas no coinciden.');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  }

  ngOnInit() {
  }

}
