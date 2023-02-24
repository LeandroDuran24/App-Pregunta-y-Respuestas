import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/preguntas';
import { Respuesta } from 'src/app/models/respuesta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: FormGroup;
  pregunta: Pregunta[] = [];
  rtaCorrecta = 0;


  constructor(private fb: FormBuilder, private router: Router, private cuestionarioService: CuestionarioService, private toastr: ToastrService) {

    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuesta: this.fb.array([])

    })
  }

  ngOnInit(): void {
    this.agregarRespuestasPorDefecto();
  }


  //Devuelve FormArray de Respuesta

  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuesta') as FormArray;
  }

  //Agregar Respuestas al Array
  agregarRespuetas(): void {

    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }))
  }

  agregarRespuestasPorDefecto(): void {

    this.agregarRespuetas();
    this.agregarRespuetas();
  }

  eliminarRespuestas(index: number): void {

    if (this.getRespuestas.length === 2) {
      this.toastr.error('Como minimo la pregunta debe contener 2 respuestas', 'Error !');


    } else {
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void {
    this.rtaCorrecta = index;

  }

  agregarPregunta(): void {

    //Obtenemos el titulo de la pregunta
    const descripcion = this.nuevaPregunta.get('titulo')?.value;

    //Obtenemos el array de respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuesta')?.value;


    //Creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((elemento:any) => {
      const respuesta: Respuesta = new Respuesta(elemento.descripcion, false);

      arrayRta.push(respuesta);
    });

    const pregunta :Pregunta = new Pregunta(descripcion,arrayRta);

  }

}
