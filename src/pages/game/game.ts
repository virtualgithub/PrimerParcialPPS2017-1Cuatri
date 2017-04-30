import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';

import { Cuestionario } from "../../classes/cuestionario";
import { CuestionarioService } from "../../classes/cuestionario.service";
import { Jugada } from "../../classes/jugada";
import { Respuesta } from "../../classes/respuesta";
import { Results } from "../results/results";

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [CuestionarioService]
})
export class Game {
  jugadas : Jugada[];

  cuestionarios : Cuestionario[];
  cuestionario : Cuestionario;

  formCuestionario : FormGroup;
  listaOpciones : FormControl;

  numeroPregunta : number = 1;
  nombreJugador : string;

  otrosRespondieron : any[];

  constructor(
    //NAVEGACIÓN
    public navCtrl: NavController,
    //ALMACENAMIENTO PERSISTENTE
    private storage: Storage,
    //TOAST (AVISO SUTIL EN PANTALLA)
    private toastCtrl: ToastController,
    //SERVICIO QUE DEVUELVE LOS CUESTIONARIOS
    private cuestionarioService: CuestionarioService,
    private vibration: Vibration,
    private nativeAudio: NativeAudio) {
      //CREACIÓN DEL FORMULARIO CON EL FORM CONTROL CORRESPONDIENTE
      this.formCuestionario = new FormGroup({"listaOpciones": new FormControl()});
      //DEFINICIÓN DE otrosRespondieron
      this.otrosRespondieron = Array();
      //PRECARGA EL SONIDO
      this.nativeAudio.preloadSimple('error', 'assets/sounds/error.mp3');
      this.nativeAudio.preloadSimple('yay', 'assets/sounds/yay.wav');
  }
  //OBTENCIÓN DE LAS JUGADAS Y DE UN NUEVO CUESTIONARIO CADA VEZ QUE SE CARGA LA PÁGINA
  ionViewDidLoad(){
    //PREPARACIÓN DEL ALMACENAMIENTO
    this.storage.ready().then(() => {
      //CARGA DEL ARRAY DE JUGADAS CON EL HISTORIAL DE JUGADAS
      this.storage.get('jugadas').then((val) => {
        //TRADUCCION DEL JSON DEVUELTO Y ASIGNACIÓN A VARIABLE JUGADAS
        this.jugadas = JSON.parse(val);
        //OBTENCIÓN DEL NOMBRE DEL JUGADOR
        this.nombreJugador = this.jugadas[0].nombreJugador;
        //OBTENCIÓN DE UN NUEVO CUESTIONARIO
        this.getCuestionarios();
      });
    });
  }
  //OBTENCIÓN DEL ARRAY DE CUESTIONARIOS
  getCuestionarios(): void {
    this.cuestionarioService.getCuestionarios().then((val) =>{
      //COPIA DEL ARRAY A VARIABLE LOCAL CUESTIONARIOS
      this.cuestionarios = val.slice();
      //GENERACIÓN INICIAL DE CUESTIONARIO
      this.GenerarCuestionario();
    });
  }
  //SELECCIÓN DE UN CUESTIONARIO ALEATORIO
  GenerarCuestionario(){
    //ELECCION RANDOM DE CUESTIONARIO
    let cuestionarioNumero : number = Math.floor((Math.random() * this.cuestionarios.length) + 0);
    //ASIGNACION DE LOS DATOS AL CUESTIONARIO
    this.cuestionario = this.cuestionarios[cuestionarioNumero];
    //GENERACIÓN DEL FORMULARIO 'OTROS RESPONDIERON' CON EL NUMERO DE FORMULARIO GENERADO RANDOMLY
    this.GenerarOtrosRespondieron(cuestionarioNumero);
    //ELIMINACION DE LA PREGUNTA USADA
    this.cuestionarios.splice(cuestionarioNumero, 1);
  }
  //GENERACIÓN DEL ARRAY 'OTROS RESPONDIERON'
  GenerarOtrosRespondieron(cuestionarioNumero : number){
    //BUSQUEDA EN TODAS LAS JUGADAS
    for (let index = 0; index < this.jugadas.length; index++) {
      //DE CADA JUGADA BUSCA EN TODAS LAS RESPUESTAS
      for (let index2 = 0; index2 < this.jugadas[index].respuestas.length; index2++) {
        //CUANDO UNA RESPUESTA COINCIDA CON EL NUMERO DE CUESTIONARIO ACTUAL
        if (this.jugadas[index].respuestas[index2].idPregunta == cuestionarioNumero) {
          //AGREGA LA RESPUESTA AL ARRAY DE OTROSRESPONDIERON PARA SER RECORRIDO EN EL TEMPLATE
          this.otrosRespondieron.push({
            nombreJugador : this.jugadas[index].nombreJugador,
            respuesta : this.cuestionarios[cuestionarioNumero].opciones[this.jugadas[index].respuestas[index2].idRespuesta],
            pathImagen : 'assets/img/' + this.GenerarNumeroAleatorio() + '.jpg'
          })
        }
      }      
    }
  }
  
  Jugar(opcionElegida : number){
    if (opcionElegida == this.cuestionario.opcionCorrecta) {
      //VIBRACIÓN
      this.vibration.vibrate(200);
      //SONIDO
      this.nativeAudio.play('yay');
      //MENSAJE SUTIL EN MEDIO DE LA PANTALLA
      let toastCorrecto = this.toastCtrl.create({
        message: 'Correcto',
        duration: 1000,
        position : "bottom"
      });
      //MUESTRA EL MENSAJE SUTIL
      toastCorrecto.present();
      //AUMENTO DE NUMERO DE RESPUESTAS INCORRECTAS (PIE DE PAGINA)
      this.jugadas[0].cantidadRespuestasCorrectas++;
    }
    else {
      //VIBRACIÓN DOBLE
      this.vibration.vibrate([200,50,200]);
      //SONIDO
      this.nativeAudio.play('error');
      //MENSAJE SUTIL EN MEDIO DE LA PANTALLA
      let toastIncorrecto = this.toastCtrl.create({
        message: 'Incorrecto',
        duration: 1000,
        position : "bottom"
      });
      //MUESTRA EL MENSAJE SUTIL
      toastIncorrecto.present();
      //AUMENTO DE NUMERO DE RESPUESTAS INCORRECTAS (PIE DE PAGINA)
      this.jugadas[0].cantidadRespuestasIncorrectas++;
    }
    //GUARDADO DE RESPUESTA ELEGIDA
    this.jugadas[0].respuestas.push(new Respuesta(this.cuestionario.idPregunta, opcionElegida));
    //LIMPIEZA DE OTROSRESPONDIERON
    this.otrosRespondieron = [];
    //DEMORA DE X MILISEGUNDOS PARA GENERAR NUEVO CUESTIONARIO
    setTimeout(() => {
      //AUMENTO DEL NUMERO DE PREGUNTA EN EL TITULO
      this.numeroPregunta++;
      if (this.numeroPregunta === 4) {
        //PREPARACIÓN DEL ALMACENAMIENTO
        this.storage.ready().then(() => {
          //GUARDADO DE LAS JUGADAS EN BASE DE DATOS
          this.storage.set('jugadas', JSON.stringify(this.jugadas)).then(() => {
            //REDIRECCION A PAGINA DE RESULTADOS (SETEO COMO PAGINA INICIAL)
            this.navCtrl.setRoot(Results, {}, {animate: true, direction: "forward"});
          });      
        });
      }
      else{
        //GENERA NUEVO CUESTIONARIO
        this.GenerarCuestionario();
        //RESETEA RADIOBUTTONS
        this.formCuestionario.controls.listaOpciones.reset();
      }
    //QUE DEMORE 500 MILISEGUNDOS
    }, 200);
  }
  //NUMERO ALEATORIO PARA LA OBTENCIÓN DE IMAGEN
  GenerarNumeroAleatorio(){
    return Math.floor((Math.random() * 7) + 0);
  }
}