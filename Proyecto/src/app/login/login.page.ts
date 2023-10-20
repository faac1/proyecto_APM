import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase//app';
import { AlertController, NavController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  newPassword: string = '';
  email: string='';
  password: string='';
  

  constructor(private afAuth: AngularFireAuth, private router: Router,
      public navCtrl: NavController, private alertController: AlertController) {}

  async iniciarSesion() {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth,this.email, this.password);
      console.log('Usuario autenticado correctamente:', userCredential.user);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      this.navCtrl.navigateRoot('inicio');
      
  
    } catch (error) {
      if (error instanceof FirebaseError) {
        
        console.error('Error al iniciar sesión:', error.code, error.message);
      } else {

        console.error('Error desconocido:', error);
      }
    }
    
  }


  async updatePassword(newPassword: string) {
    try {
      const userCredential = await this.afAuth.currentUser;
      if (userCredential) {
        await userCredential.updatePassword(newPassword);
        console.log('Contraseña actualizada exitosamente.');
      } else {
        console.log('No hay un usuario autenticado.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
    }
  }

    
}
  

