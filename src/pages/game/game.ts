import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { Results } from '../result/result';

interface Jugada {
  nombreJugador : string;
  cuestionarios : Array<Cuestionario>;
}

interface Cuestionario {
  idPregunta : number;
  pregunta : string;
  opcion1 : string;
  opcion2 : string;
  opcion3 : string;
  opcionCorrecta : number;
  opcionElegida : number;
}

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {
  jugadas : any[];
  jugadaActual : any;
  nombre : string;
  numeroPregunta : number = 1;
  listaOpciones : any;
  formCuestionario : any;
  cuestionarios : any[];
  pregunta : string;
  opcion1 : string;
  opcion2 : string;
  opcion3 : string;
  opcionCorrecta : number;
  numeroCorrectas : number = 0;
  numeroIncorrectas : number = 0;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    //TOAST (AVISO SUTIL EN PANTALLA)
    private toastCtrl: ToastController) {

    //OBTENCION DE LA KEY 'NOMBRE' DE LA BASE DE DATOS Y ASIGNACION A LA VARIABLE NOMBRE
    this.storage.get('nombre').then((val) => {this.nombre = val;});
    
    this.formCuestionario = new FormGroup({"listaOpciones": new FormControl()});
    this.cuestionarios = [
      {
        pregunta : "¿Cuál es la capital de Noruega?",
        opcion1 : "Estocolmo",
        opcion2 : "Oslo",
        opcion3 : "Helsinki",
        opcionCorrecta : 2
      },
      {
        pregunta : "¿Cuántos huevos hay en 7 docenas?",
        opcion1 : "74",
        opcion2 : "94",
        opcion3 : "84",
        opcionCorrecta : 3
      },
      {
        pregunta : "¿Quién fue el 3° presidente de Argentina?",
        opcion1 : "Justo José de Urquiza",
        opcion2 : "Bernardino Rivadavia",
        opcion3 : "Vicente López y Planes",
        opcionCorrecta : 1
      },
      {
        pregunta : "¿En qué año se instaló el 1° semáforo?",
        opcion1 : "1868",
        opcion2 : "1968",
        opcion3 : "1986",
        opcionCorrecta : 1
      },
      {
        pregunta : "¿Por qué en buceo se tiran hacia atrás?",
        opcion1 : "Por costumbre",
        opcion2 : "Por seguridad",
        opcion3 : "Si se tiran hacia adelante caen en el bote",
        opcionCorrecta : 2
      },
      {
        pregunta : "Si un abogado enloquece, ¿Pierde el juicio?",
        opcion1 : "No",
        opcion2 : "Si",
        opcion3 : "Quizás",
        opcionCorrecta : 0
      }
    ];
    this.GenerarCuestionario();
  }
  GenerarCuestionario(){
    //ELECCION RANDOM DE CUESTIONARIO
    let cuestionarioNumero : number = Math.floor((Math.random() * this.cuestionarios.length) + 0);
    //ASIGNACION DE LOS DATOS AL CUESTIONARIO
    this.pregunta = this.cuestionarios[cuestionarioNumero].pregunta;
    this.opcion1 = this.cuestionarios[cuestionarioNumero].opcion1;
    this.opcion2 = this.cuestionarios[cuestionarioNumero].opcion2;
    this.opcion3 = this.cuestionarios[cuestionarioNumero].opcion3;
    this.opcionCorrecta = this.cuestionarios[cuestionarioNumero].opcionCorrecta;
    //ELIMINACION DE LA PREGUNTA USADA
    this.cuestionarios.splice(cuestionarioNumero, 1);
  }
  Jugar(opcionElegida){
    if (opcionElegida == this.opcionCorrecta) {
      //MENSAJE SUTIL EN MEDIO DE LA PANTALLA
      let toastCorrecto = this.toastCtrl.create({
        message: 'Correcto!',
        duration: 2000,
        position : "middle"
      });
      //MUESTRA EL MENSAJE SUTIL
      toastCorrecto.present();
      //AUMENTO DE NUMERO DE RESPUESTAS INCORRECTAS (PIE DE PAGINA)
      this.numeroCorrectas++;
    }
    else {
      //MENSAJE SUTIL EN MEDIO DE LA PANTALLA
      let toastIncorrecto = this.toastCtrl.create({
        message: 'Incorrecto!',
        duration: 2000,
        position : "middle"
      });
      //MUESTRA EL MENSAJE SUTIL
      toastIncorrecto.present();
      //AUMENTO DE NUMERO DE RESPUESTAS INCORRECTAS (PIE DE PAGINA)
      this.numeroIncorrectas++;
    }
    
    //AUMENTO DEL NUMERO DE PREGUNTA EN EL TITULO
    this.numeroPregunta++;
    //REDIRECCION A PAGINA DE RESULTADOS
    if (this.numeroPregunta === 4) {

    }
    //DEMORA DE 2 SEGUNDOS PARA GENERAR NUEVO CUESTIONARIO
    setTimeout(() => {this.GenerarCuestionario()}, 2000);
    //DEMORA DE 2 SEGUNDOS PARA RESETEAR RADIOBUTTONS
    setTimeout(() => {this.formCuestionario.controls.listaOpciones.reset()}, 2000);
  }
  GuardarJugada(){
    //CARGA DEL ARRAY DE HISTORIAL DE JUGADAS
    this.storage.get('jugadas').then((val) => {this.jugadas = JSON.parse(val);});
    //CASO EN EL QUE SE HA LLEGADO AL MAXIMO (5) DE JUGADAS GUARDADAS
    if (this.jugadas.length == 5) {
      //ELIMINACION DE LA PRIMERA JUGADA (AL PRINCIPIO DEL ARRAY)
      this.jugadas.shift();
      //AGREGADO DE LA JUGADA ACTUAL (AL FINAL DEL ARRAY)
      this.jugadas.push();
    }
    //DEMORA DE 2 SEGUNDOS PARA REDIRIGIR A RESULTADOS
    setTimeout(() => {
      this.storage.ready().then(() => {
        //GUARDADO DEL NOMBRE EN BASE DE DATOS
        this.storage.set('jugadas', nombre).then((val) => {
          //REDIRECCION A PAGINA GAME
          this.navCtrl.push(Results);
        })
      });      
    }, 2000);
  }
}

var val = JSON.parse(profile)