import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import  queryString  from 'query-string';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController) { 
    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    });
  }
  async ingresar() {
    var f = this.formularioLogin.value;

    var usuarioString = localStorage.getItem('usuario');
    var usuario;

    if (usuarioString) {
      usuario = JSON.parse(usuarioString);
    }

    if(usuario.email == f.email && usuario.password == f.password ){
      console.log('ingresado')
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Tienes que llenar bien los datos',
        buttons: ['Aceptar']
      });

      await alert.present();
    }
  }

  ngOnInit() {
    //aun no hay na :)
  }


}
