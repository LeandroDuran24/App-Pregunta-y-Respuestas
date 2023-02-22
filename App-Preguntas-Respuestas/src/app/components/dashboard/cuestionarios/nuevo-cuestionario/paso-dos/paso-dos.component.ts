import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/preguntas';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit{


  tituloCuestionario:string;
  descripcionCuestionario:string;
  listPreguntas:Pregunta[]=[]; 

  constructor(private fb:FormBuilder,private router:Router,private cuestionarioService:CuestionarioService,private toastr:ToastrService) {
    this.tituloCuestionario='';
    this.descripcionCuestionario='';

  }

  ngOnInit():void{

    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario=this.cuestionarioService.descripcionCuestionario;


  }

}
