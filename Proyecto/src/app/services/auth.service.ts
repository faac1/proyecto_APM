import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getAuth, updatePassword } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async cambiarContrasena(nuevaContrasena: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      await updatePassword(user, nuevaContrasena);
    } else {
      throw new Error('Usuario no autenticado.');
    }
  }


  constructor( private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase) { }


  getCurrentUserUID(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.uid); 
        } else {
          resolve(null); 
        }
      });
    });
  }

  getUserName(uid: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const userRef = this.afDatabase.object(`usuarios/${uid}`);
      userRef.valueChanges().subscribe((userData: any) => {
        if (userData && userData.nombre) {
          resolve(userData.nombre);
        } else {
          resolve(null);
        }
      }, error => {
        reject(error);
      });
    });
  }
}

