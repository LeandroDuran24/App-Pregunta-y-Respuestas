export class Respuesta {

    id?: number;
    descripcion: string;
    esCorrrecta: boolean;

    /**
     *
     */
    constructor(descripcion: string, esCorrecta: boolean, id?: number) {
        this.id = id;
        this.descripcion =descripcion;
        this.esCorrrecta = esCorrecta;

    }
}