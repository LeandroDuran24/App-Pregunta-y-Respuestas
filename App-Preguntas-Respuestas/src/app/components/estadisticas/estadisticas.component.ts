import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  idCuestionario: number;
  loading = false;
  listRespuestaCuestionario:any[]=[];

  constructor(private aRoute: ActivatedRoute, private respuestaCuestionarioService: RespuestaCuestionarioService,private toast:ToastrService) {
    this.idCuestionario = Number(this.aRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }


  getListCuestionarioService(): void {
    this.loading = true;

    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data => {
      this.loading = false;
      this.listRespuestaCuestionario=data;
    }, error => {


    })
  }


  
  eliminarRespuestaCuestionario(idRespuestaCuestionario:number):void{

    this.loading=true;

    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRespuestaCuestionario).subscribe(data=>{

      this.loading=false;
      this.toast.error('La respuesta al cuestionario fue eliminada con exito!','Registro eliminado');
      this.getListCuestionarioService();
    },error=>{
      this.loading=false;
      this.toast.error(error.error.message,'Error !');

    })

  }

}
