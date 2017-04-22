import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { Jugada } from "../../classes/jugada";
import { Cuestionario } from "../../classes/cuestionario";



@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {
  jugadas : Jugada[];

  cuestionarios : Cuestionario[];
  cuestionario : Cuestionario;

  formCuestionario : FormGroup;
  listaOpciones : FormControl;

  numeroPregunta : number = 1;
  numeroCorrectas : number = 0;
  numeroIncorrectas : number = 0;

  constructor(
    //NAVEGACIÓN
    public navCtrl: NavController,
    //ALMACENAMIENTO PERSISTENTE
    private storage: Storage,
    //TOAST (AVISO SUTIL EN PANTALLA)
    private toastCtrl: ToastController) {
      //CARGA DEL ARRAY DE JUGADAS CON EL HISTORIAL DE JUGADAS
      this.storage.get('jugadas').then((val) => {this.jugadas = JSON.parse(val);});
      //CREACIÓN DEL FORMULARIO CON EL FORM CONTROL CORRESPONDIENTE
      this.formCuestionario = new FormGroup({"listaOpciones": new FormControl()});
      //CREACIÓN DEL ARRAY DE CUESTIONARIOS
      this.cuestionarios = [
        {
          idPregunta : 0,
          pregunta : "¿Cuál es la capital de Noruega?",
          opcion1 : "Estocolmo",
          opcion2 : "Oslo",
          opcion3 : "Helsinki",
          opcionCorrecta : 2
        },
        {
          idPregunta : 1,
          pregunta : "¿Cuántos huevos hay en 7 docenas?",
          opcion1 : "74",
          opcion2 : "94",
          opcion3 : "84",
          opcionCorrecta : 3
        },
        {
          idPregunta : 2,
          pregunta : "¿Quién fue el 3° presidente de Argentina?",
          opcion1 : "Justo José de Urquiza",
          opcion2 : "Bernardino Rivadavia",
          opcion3 : "Vicente López y Planes",
          opcionCorrecta : 1
        },
        {
          idPregunta : 3,
          pregunta : "¿En qué año se instaló el 1° semáforo?",
          opcion1 : "1868",
          opcion2 : "1968",
          opcion3 : "1986",
          opcionCorrecta : 1
        },
        {
          idPregunta : 4,
          pregunta : "¿Por qué en buceo se tiran hacia atrás?",
          opcion1 : "Por costumbre",
          opcion2 : "Por seguridad",
          opcion3 : "Si se tiran hacia adelante caen en el bote",
          opcionCorrecta : 2
        },
        {
          idPregunta : 5,
          pregunta : "Si un abogado enloquece, ¿Pierde el juicio?",
          opcion1 : "No",
          opcion2 : "Si",
          opcion3 : "Quizás",
          opcionCorrecta : 2
        },
        {
          idPregunta : 6,
          pregunta : "¿Cómo descargar más RAM?",
          opcion1 : "Usando Google.es",
          opcion2 : "mmm...",
          opcion3 : "Usando Feisbuc",
          opcionCorrecta : 0
        }
      ];
      //GENERACIÓN INICIAL DE CUESTIONARIO
      this.GenerarCuestionario();
  }
  GenerarCuestionario(){
    //ELECCION RANDOM DE CUESTIONARIO
    let cuestionarioNumero : number = Math.floor((Math.random() * this.cuestionarios.length) + 0);
    //ASIGNACION DE LOS DATOS AL CUESTIONARIO
    this.cuestionario = this.cuestionarios[cuestionarioNumero];
    //ELIMINACION DE LA PREGUNTA USADA
    this.cuestionarios.splice(cuestionarioNumero, 1);
  }
  Jugar(opcionElegida : number){
    if (opcionElegida == this.cuestionario.opcionCorrecta) {
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
    //GUARDADO DE RESPUESTA ELEGIDA
    this.jugadas[0].respuestas[this.cuestionario.idPregunta] = opcionElegida;
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
    //DEMORA DE 2 SEGUNDOS PARA REDIRIGIR A RESULTADOS
    setTimeout(() => {
      this.storage.ready().then(
        //GUARDADO DEL NOMBRE EN BASE DE DATOS
        () => {
        this.storage.set('jugadas', nombre).then((val) => {
          //REDIRECCION A PAGINA GAME
          this.navCtrl.push(Results);
        })
      });      
    }, 2000);
  }
}

var val = JSON.parse(profile)
JSON.stringify(this._profile);