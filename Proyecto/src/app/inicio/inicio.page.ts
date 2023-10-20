import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  usuarioNombre: string =''; 

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      console.log('estado del usuario autenticado', user)
      if (user) {
        const uid = user.uid;
        this.authService.getUserName(uid).then((nombre:string|null) => {
          if (nombre) {
            this.usuarioNombre = nombre; // Asigna el nombre del usuario a la propiedad usuarioNombre
            console.log(`Hola ${nombre}`);
          } else {
            console.log('No se encontró el nombre del usuario.');
          }
        });
      } else {
        console.log('Usuario no autenticado.');
      }
    });
  }
}