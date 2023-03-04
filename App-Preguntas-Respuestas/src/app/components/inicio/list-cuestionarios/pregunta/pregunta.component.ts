import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/preguntas';
import { Respuesta } from 'src/app/models/respuesta';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuetrionarioDetalle';
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
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada: number = 0;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService, private cuestionarioService: CuestionarioService, private router: Router) {


  }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;

    if (this.idCuestionario == 0) {
      this.router.navigate(['/inicio'])
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas = [];
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


  respuestaSeleccionada(respuesta: any, idRespuesta: number): void {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;

  }

  AddClassOption(respuesta: any): string {

    if (respuesta == this.opcionSeleccionada) {
      return "active text-light";
    }

    return "";
  }


  siguiente(): void {

    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

    //creamos un objeto respuestaDetalle 
    const respuestaDetalle: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada

    };


    //Agregamos objeto al Array
    this.listRespuestaDetalle.push(respuestaDetalle);


    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = 0;


    console.log(this.index);
    console.log(this.listPreguntas.length);

    if (this.index === this.listPreguntas.length) {
      //this.router.navigate(['/inicio/respuestaCuestionario']);
      this.guardarRespuestaCuestionario();
    }
  }



  guardarRespuestaCuestionario(): void {

   
    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      participante: this.respuestaCuestionarioService.nombreParticipante,
      listCuestionarioDetalle: this.listRespuestaDetalle
    };


    console.log(rtaCuestionario);

    this.loading = true;
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data => {
      this.router.navigate(['/inicio/respuestaCuestionario']);
      this.loading = false;

    }, error => {
      this.loading = false;
      console.log(error);

    })

  }
}
