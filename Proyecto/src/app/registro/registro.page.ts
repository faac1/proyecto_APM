import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  email: string='';
  password: string='';
  nombre: string='';
  role: string='';

  constructor(private firestore: AngularFirestore,
      public navCtrl: NavController) { }

  async registrarUsuario() {
    const usuario = {
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      role: this.role
    };

    try {
      await this.firestore.collection('usuarios').add(usuario);
      console.log('Usuario registrado correctamente en la base de datos.');
      localStorage.setItem('user', JSON.stringify(usuario));
      this.navCtrl.navigateRoot('inicio');

    } catch (error) {
      console.error('Error al registrar usuario en la base de datos:', error);
    }
  }
}
