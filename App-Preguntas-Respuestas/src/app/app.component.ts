import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listEstudiantes: any[] = [{
    nombre: 'Tomas Gonzalez',
    estado: 'Regular'
  }, {
    nombre: 'Juan Perez',
    estado: 'Promocionado'
  },
  {
    nombre: 'Leandro Duran',
    estado: 'Normal'
  },
  {
    nombre: 'Jhayco Rafael',
    estado: 'Promocionado'
  },
  {
    nombre: 'Ana Duran',
    estado: 'Libre'
  }];

  mostrar=true;

toogle():void{

this.mostrar=!this.mostrar;
}

}
