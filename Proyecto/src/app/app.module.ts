import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment'; 
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,
    ReactiveFormsModule,FormsModule, AngularFireModule.initializeApp(environment.firebaseConfig),
  AngularFirestoreModule],
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
