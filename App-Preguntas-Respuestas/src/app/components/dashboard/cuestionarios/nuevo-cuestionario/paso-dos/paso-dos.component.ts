import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionarios';
import { Pregunta } from 'src/app/models/preguntas';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {


  tituloCuestionario: string;
  descripcionCuestionario: string;
  listPreguntas: Pregunta[] = [];
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private cuestionarioService: CuestionarioService, private toastr: ToastrService) {
    this.tituloCuestionario = '';
    this.descripcionCuestionario = '';

  }

  ngOnInit(): void {

    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void {

    this.listPreguntas.push(pregunta);
  }
  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);

  }


  guardarCuestionario(): void {

    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas

    }
    this.loading = true;
    console.log((cuestionario));

    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data => {
      this.toastr.success('Se ha registrado el cuestionario', 'Guardar Cuestionario');
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, error => {
      console.log(JSON.stringify(error));
      this.router.navigate(['/dashboard']);
      this.toastr.error('Oops, Ocurrio un error', 'Error !');
      this.loading = false;
    });
  }


}
