import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cuestionario } from '../models/cuestionarios';
import { RespuestaCuestionario } from '../models/RespuestaCuestionario';



@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  myAppUrl: string;
  myApiUrl: string;

  nombreParticipante: string;
  idCuestionario: number;
  respuestas: number[] = [];
  cuestionario!: Cuestionario;

  constructor(private http: HttpClient) {
    this.nombreParticipante = '';
    this.idCuestionario = 0;
    this.myAppUrl = 'http://localhost:5105';
    this.myApiUrl = '/api/RespuestasCuestionario/';

  }


  guardarRespuestaCuestionario(respuestaCuestionario: RespuestaCuestionario): Observable<any> {


    return this.http.post(this.myAppUrl + this.myApiUrl, respuestaCuestionario);
  }


  getListCuestionarioRespuesta(idCuestionario: number): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }


  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + idRespuestaCuestionario);

  }


  getCuestionarioByIdRespuesta(idRespuesta:number):Observable<any>
  {

    return this.http.get(this.myAppUrl+this.myApiUrl+'GetCuestionarioByIdRespuesta/'+idRespuesta);
  }


}
