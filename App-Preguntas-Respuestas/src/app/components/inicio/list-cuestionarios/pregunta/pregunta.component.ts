import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/preguntas';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {


  idCuestionario: number = 0;
  listPreguntas: any = {};
  loading = false;
  rtaConfirmada = false;
  opcionSeleccionada :any;
  index=0;
  idRespuestaSeleccionada:number=0;

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService, private cuestionarioService: CuestionarioService, private router: Router) {


  }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;

    if (this.idCuestionario == 0) {
      this.router.navigate(['/inicio'])
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas=[];
  }

  getCuestionario(): void {
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {

      this.listPreguntas = data.listPreguntas;
      this.loading = false;
      this.respuestaCuestionarioService.cuestionario = data;

    });


  }

  obtenerPregunta(): string {
    return this.listPreguntas[this.index].descripcion;
  }


  getIndex(): number {
    return this.index;
  }


  respuestaSeleccionada(respuesta: any,idRespuesta:number): void {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada =true;
    this.idRespuestaSeleccionada=idRespuesta;

  }

  AddClassOption(respuesta: any): string {

    if (respuesta == this.opcionSeleccionada) {
      return "active text-light";
    }

    return "";
  }


  siguiente():void{
    this.rtaConfirmada=false;
    this.index++;
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);
    this.idRespuestaSeleccionada=0;


    if(this.index===this.listPreguntas.length){
      this.router.navigate(['/inicio/respuestaCuestionario']);
    }
  }
}
