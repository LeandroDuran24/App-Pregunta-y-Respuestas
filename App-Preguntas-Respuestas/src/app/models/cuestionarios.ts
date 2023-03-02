import { Pregunta } from "./preguntas";
import { Usuario } from "./usuario";

export class Cuestionario {

    id?: number = 0;
    nombre: string;
    descripcion: string;
    fechaCreacion?: Date;
    listPreguntas: Pregunta[];
    


    constructor(nombre: string, descripcion: string, fechaCreacion: Date, listPreguntas: Pregunta[]) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.listPreguntas = listPreguntas;
        this.id=0;


    }

}