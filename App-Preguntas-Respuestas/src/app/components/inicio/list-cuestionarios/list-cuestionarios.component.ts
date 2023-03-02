import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionarios';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit {


  loading = false;
  listCuestionarios: any[] = [];
  constructor(private cuestionarioService: CuestionarioService, private router: Router,private respuestaCuestionario:RespuestaCuestionarioService) {


  }
  ngOnInit(): void {
    this.getListCuestionarios();
  }


  getListCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarios().subscribe(data => {
      this.listCuestionarios = data;
      this.loading = false;
    })
  }

  ingresarNombre(idCuestionario: number): void {

    this.respuestaCuestionario.idCuestionario =idCuestionario;
    this.router.navigate(['/inicio/ingresarNombre']);

  }
}
