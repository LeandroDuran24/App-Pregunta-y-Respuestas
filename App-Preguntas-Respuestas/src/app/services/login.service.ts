import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl = '';
  myApiUrl = '';

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:5105';
    this.myApiUrl = '/api/Login';
  }


  login(usuario: Usuario): Observable<any> {

    return this.http.post(this.myAppUrl + this.myApiUrl, usuario);

  }

  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  /*getNombreUsuario(): string {

    return localStorage.getItem('nombreUsuario') as string;
  }*/

  getTokenDecoded():any{

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem('token') as string);
    return decodedToken;

  }

  removeNombreUsuario():void{

    localStorage.removeItem('token');
  }


  getToken():string{

    return localStorage.getItem('token') as string;
  }



}
