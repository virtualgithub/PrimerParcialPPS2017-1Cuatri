import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class Game {
  nombre : string;
  numeroPregunta : number = 1;
  listaOpciones : any;
  formCuestionario : any;
  cuestionario : any[];
  pregunta : string;
  opcion1 : string;
  opcion2 : string;
  opcion3 : string;
  opcionCorrecta : number;
  numeroCorrectas : number = 0;
  numeroIncorrectas : number = 0;
  limpia : string = "false";
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    //TOAST (AVISO SUTIL EN PANTALLA)
    private toastCtrl: ToastController) {

    //OBTENCION DE LA KEY 'NOMBRE' DE LA BASE DE DATOS Y ASIGNACION A LA VARIABLE NOMBRE
    this.storage.get('nombre').then((val) => {this.nombre = val;});
    
    this.formCuestionario = new FormGroup({"listaOpciones": new FormControl()});
    this.cuestionario = [
      {
        pregunta : "¿Cuál es la capital de Noruega?",
        opcion1 : "Estocolmo",
        opcion2 : "Oslo",
        opcion3 : "Helsinki",
        opcionCorrecta : 2
      },
      {
        pregunta : "¿Cuántos huevos hay en 7 docenas?",
        opcion1 : "77",
        opcion2 : "74",
        opcion3 : "84",
        opcionCorrecta : 3
      },
      {
        pregunta : "¿Quién fue el tercer presidente de Argentina?",
        opcion1 : "Justo José de Urquiza",
        opcion2 : "Bernardino Rivadavia",
        opcion3 : "Vicente López y Planes",
        opcionCorrecta : 1
      }
    ];
    this.GenerarCuestionario();
  }
  GenerarCuestionario(){
    //ELECCION RANDOM DE CUESTIONARIO
    let cuestionarioNumero : number = Math.floor((Math.random() * 2) + 0);
    this.pregunta = this.cuestionario[cuestionarioNumero].pregunta;
    this.opcion1 = this.cuestionario[cuestionarioNumero].opcion1;
    this.opcion2 = this.cuestionario[cuestionarioNumero].opcion2;
    this.opcion3 = this.cuestionario[cuestionarioNumero].opcion3;
    this.opcionCorrecta = this.cuestionario[cuestionarioNumero].opcionCorrecta;
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
      console.log("MOSTRAR RESULTADOS");
    }
    this.GenerarCuestionario();
  }
}
