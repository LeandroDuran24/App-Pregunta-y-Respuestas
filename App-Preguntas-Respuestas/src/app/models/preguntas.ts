import { Respuesta } from "./respuesta";

export class Pregunta {


    descripcion: string;
    listRespuestas: Respuesta[];
    hide?: boolean;



    constructor(descripcion: string, listRespuesta: Respuesta[]) {
        this.descripcion = descripcion; 
        this.listRespuestas = listRespuesta;

    }

}