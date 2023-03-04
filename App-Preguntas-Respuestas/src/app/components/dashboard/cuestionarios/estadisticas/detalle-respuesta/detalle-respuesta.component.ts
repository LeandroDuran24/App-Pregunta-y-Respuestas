import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionarios';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuetrionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit {

  idRespuesta:number;
  loading=false;
  cuestionarios:any;
  respuestas:RespuestaCuestionarioDetalle[]=[];

  constructor(private aRoute:ActivatedRoute,private respuestaCuestionarioService:RespuestaCuestionarioService) {
    
    this.idRespuesta =+ Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListRespuestasYCuestionario();
  }


  getListRespuestasYCuestionario():void{

    this.loading=true;
   this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data=>{

      this.cuestionarios=data.cuestionarios;
      this.respuestas=data.respuestas;
      this.loading=false;


      console.log(data);
      
    },error=>{

    })
  }
}
