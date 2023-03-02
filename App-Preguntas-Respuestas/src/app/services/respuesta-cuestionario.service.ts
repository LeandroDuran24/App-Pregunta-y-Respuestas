import { Injectable } from '@angular/core';
import { Cuestionario } from '../models/cuestionarios';



@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  nombreParticipante:string;
  idCuestionario:number;
  respuestas:number[]=[];
  cuestionario!:Cuestionario;

  constructor() { 
    this.nombreParticipante='';
    this.idCuestionario=0;
     
  }

  
}
