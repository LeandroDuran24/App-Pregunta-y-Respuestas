import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/cuestionarios';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  myAppUrl: string;
  myApiUrl: string;
  tituloCuestionario: string;
  descripcionCuestionario: string;

  constructor(private http: HttpClient) {

    this.myAppUrl = 'http://localhost:5105';
    this.myApiUrl = '/api/Cuestionario/';
    this.tituloCuestionario = '';
    this.descripcionCuestionario = '';
  }


  guardarCuestionario(cuestionario: Cuestionario): Observable<any> {

    return this.http.post(this.myAppUrl + this.myApiUrl, cuestionario);
  }


  getListCuestionarios(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetCuestionarioByUser');
  }
}
