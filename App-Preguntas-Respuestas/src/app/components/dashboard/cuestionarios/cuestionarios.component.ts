import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionarios';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  nombreUsuario: string = '';
  listCuestionarios: Cuestionario[] = [];
  loading = false;



  constructor(private loginService: LoginService, private cuestionarioService: CuestionarioService, private toastr: ToastrService) { }

  /**
 *
 */
  ngOnInit(): void {

    this.getNombreUsuario();
    this.getCuestionarios();
  }


  getNombreUsuario(): void {

    this.nombreUsuario = this.loginService.getTokenDecoded().sub;
  }

  getCuestionarios(): void {

    this.loading = true;
    this.cuestionarioService.getListCuestionariosByUser().subscribe(data => {
      this.listCuestionarios = data;
      this.loading = false;
    }, error => {

      console.log(error);
      this.toastr.error('Error al obtener los cuestionarios', 'Error !');
      this.loading = false;
    })
  }


  deleteCuestionario(idCuestionario:number):void{
    if(confirm('Estas seguro que desea eliminar el cuestionario ?'))
    {
      this.loading=true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data=>{
        this.toastr.success('El cuestionario fue eliminado con exito!','Registro eliminado!');
        this.getCuestionarios();
        this.loading=false;

      },error=>{
        this.toastr.error(error.error.message,'Error !');
        this.loading=false;
      })
    }

  }


  getListCuestionarios():void{

    
  }
}
