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
export class Results implements OnInit{
  jugadas : Jugada[];
  nombreJugador : string;
  cuestionarios : Cuestionario[];
  preguntas : string[];

  constructor(
    public navCtrl: NavController,
    //SERVICIO QUE DEVUELVE LOS CUESTIONARIOS
    private cuestionarioService: CuestionarioService,
    //ALMACENAMIENTO PERSISTENTE
    private storage: Storage) {
      //INCIALIZACIÓN DE ARRAY PREGUNTAS
      this.preguntas = Array();
      //PREPARACIÓN DEL ALMACENAMIENTO
      this.storage.ready().then(() => {
        //CARGA DEL ARRAY DE JUGADAS CON EL HISTORIAL DE JUGADAS
        this.storage.get('jugadas').then((val) => {
          //TRADUCCION DEL JSON DEVUELTO Y ASIGNACIÓN A VARIABLE JUGADAS
          this.jugadas = JSON.parse(val);
          //OBTENCIÓN DEL NOMBRE DEL JUGADOR
          this.nombreJugador = this.jugadas[0].nombreJugador;
          this.getCuestionarios().then(() => this.MostrarResultados());
        });     
      });
  }

  //OBTENCIÓN DEL ARRAY DE CUESTIONARIOS Y ASIGNACIÓN A VARIABLE LOCAL CUESTIONARIOS
  getCuestionarios() {
    return this.cuestionarioService.getCuestionarios().then((val) =>{
      this.cuestionarios = val;
    });
  }
  //LIFECYCLE HOOK (FUNCION QUE SE EJECUTA AL CREAR EL COMPONENTE)
  ngOnInit(): void {
    
  }
  //REDIRECCION A PAGINA DE HOME (SETEO COMO PAGINA INICIAL)
  irHome(nombre){
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: "back"});
  }

  MostrarResultados(){
    let cantidadRespuestas : number = this.jugadas[0].respuestas.length;
    //LOOP QUE RECORRE TODAS LAS RESPUESTAS DE LA JUGADA 0 (LA ACTUAL)
    for (let index = 0; index < cantidadRespuestas; index++) {
      let idPregunta = this.jugadas[0].respuestas[index].idPregunta;
      let cantidadCuestionarios : number = this.cuestionarios.length;
      for (let index2 = 0; index2 < cantidadCuestionarios; index2++) {
        if (idPregunta === this.cuestionarios[index2].idPregunta) {
          this.preguntas.push(this.cuestionarios[index2].pregunta);
        }        
      }
    }
  }
}
