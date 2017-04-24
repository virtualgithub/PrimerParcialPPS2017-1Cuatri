import { Respuesta } from "./respuesta";


export class Jugada {
  nombreJugador : string;
  respuestas : Respuesta[];
  cantidadRespuestasCorrectas : number;
  cantidadRespuestasIncorrectas : number;

  constructor(nombre : string){
    this.nombreJugador = nombre;
    this.respuestas = Array();
    this.cantidadRespuestasCorrectas = 0;
    this.cantidadRespuestasIncorrectas = 0;;
  }
  //CREA JUGADA AL PRINCIPIO DEL ARRAY DE JUGADAS
  AgregarJugada(jugadas : Jugada[]) : Jugada[] {
    //CASO EN EL QUE SE HA LLEGADO AL MÁXIMO (5) DE JUGADAS GUARDADAS
    if (jugadas.length == 5) {
      //ELIMINACION DE LA JUGADA MÁS ANTIGUA (AL FINAL DEL ARRAY)
      jugadas.pop();
      //AGREGADO DE LA JUGADA ACTUAL (AL PRINCIPIO DEL ARRAY)
      jugadas.unshift(this);
    }
    //CASO EN EL QUE AÚN NO SE HA LLEGADO AL MÁXIMO DE (5) JUGADAS GUARDADAS
    else{
      jugadas.unshift(this);
    }
    return jugadas;
  }

  AgregarRespuesta(idPreguntaBuscada, idRespuestaAgregada){
    this.respuestas.forEach(element => {
      if (element.idPregunta == idPreguntaBuscada) {
        element.idRespuesta = idRespuestaAgregada;
        return;
      }
    });
    this.respuestas.push(new Respuesta(idPreguntaBuscada, idRespuestaAgregada));
  }
}