import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string ='http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  registrar(email: string, password: string, nombre: string, role: string): Observable<any> {
    const registroData = { email, password, nombre, role };
    return this.http.post(`${this.apiUrl}/registro`, registroData);
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-info`);
  }
}
