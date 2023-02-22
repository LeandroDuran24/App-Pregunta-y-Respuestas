import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/preguntas';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent {

  nuevaPregunta:FormGroup;
  pregunta:Pregunta[]=[];
  rtaCorrecta=0;

 
  constructor(private fb:FormBuilder,private router:Router,private cuestionarioService:CuestionarioService,private toastr:ToastrService) {
 
    this.nuevaPregunta =this.fb.group({
        titulo:['',Validators.required],
        respuesta:this.fb.array([])

    })

  }

}
