import { RespuestaCuestionarioDetalle } from "./RespuestaCuetrionarioDetalle";

export class RespuestaCuestionario {


    cuestionarioId:number;
    participante:string;
    listCuestionarioDetalle:RespuestaCuestionarioDetalle[];
    


    /**
     *
     */
    constructor() {
      this.cuestionarioId=0;
      this.participante='';
      this.listCuestionarioDetalle = [];

    }





}