import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Cuestionario } from "../../classes/cuestionario";
import { CuestionarioService } from "../../classes/cuestionario.service";
import { HomePage } from '../home/home';
import { Jugada } from "../../classes/jugada";
import { Respuesta } from "../../classes/respuesta";

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
  providers: [CuestionarioService]
})
export class Results {
  jugadas : Jugada[];
  nombreJugador : string;
  cuestionarios : Cuestionario[];
  preguntasRespuestas : any[];

  constructor(
    public navCtrl: NavController,
    //SERVICIO QUE DEVUELVE LOS CUESTIONARIOS
    private cuestionarioService: CuestionarioService,
    //ALMACENAMIENTO PERSISTENTE
    private storage: Storage) {
      //INCIALIZACIÓN DE ARRAY PREGUNTAS
      this.preguntasRespuestas = Array();
      //PREPARACIÓN DEL ALMACENAMIENTO
      this.storage.ready()
      .then(() => {
        //CARGA DEL ARRAY DE JUGADAS CON EL HISTORIAL DE JUGADAS
        this.storage.get('jugadas').then((val) => {
          //TRADUCCION DEL JSON DEVUELTO Y ASIGNACIÓN A VARIABLE JUGADAS
          this.jugadas = JSON.parse(val);
          //OBTENCIÓN DEL NOMBRE DEL JUGADOR
          this.nombreJugador = this.jugadas[0].nombreJugador;
          //OBTENCIÓN DEL ARRAY DE CUESTIONARIOS
          this.cuestionarioService.getCuestionarios().then((val) =>{
            //ASIGNACIÓN A VARIABLE LOCAL CUESTIONARIOS
            this.cuestionarios = val.slice();
            //GENERACIÓN Y MUESTRA DE LOS RESULTADOS
            this.MostrarResultados();
          });
        });     
      });
  }
  //REDIRECCION A PAGINA DE HOME (SETEO COMO PAGINA INICIAL)
  irHome(nombre){
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: "back"});
  }

  MostrarResultados(){
    //LOOP QUE RECORRE TODAS LAS RESPUESTAS DE LA JUGADA 0 (LA ACTUAL)
    for (let index = 0; index < this.jugadas[0].respuestas.length; index++) {
      //ALMACENAMIENTO DEL ID DE CADA RESPUESTA REALIZADA
      let idPregunta = this.jugadas[0].respuestas[index].idPregunta;
      let idRespuesta = this.jugadas[0].respuestas[index].idRespuesta;
      //LOOP QUE RECORRE TODO EL CUESTIONARIO
      for (let index2 = 0; 2 < this.cuestionarios.length; index2++) {
        //BUSQUEDA DE LA PREGUNTA EN EL ARRAY DE CUESTIONARIOS
        if (idPregunta === this.cuestionarios[index2].idPregunta) {
          //ALMACENAMIENTO DE LA PREGUNTA EN EL ARRAY LOCAL DE PREGUNTASRESPUESTAS
          this.preguntasRespuestas.push({
            pregunta : this.cuestionarios[index2].pregunta,
            respuesta : this.cuestionarios[index2].opciones[idRespuesta]
          });
          break;
        }
      }
    }
  }
}