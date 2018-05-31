import { AltaveterinarioPage } from './../altaveterinario/altaveterinario';
import { DetallescitaPage } from "./../detallescita/detallescita";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import * as firebase from "firebase";
import { Cita } from "../../clases/Cita";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { LoginPage } from "../login/login";
/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-historial",
  templateUrl: "historial.html",
  providers: [UsersserviceProvider]
})
export class HistorialPage {
  citas = [];
  vacunas = [];
  mascota: any;
  uid = UsersserviceProvider.userUID;
  usuariodata = UsersserviceProvider.userdata;
  pantalla: string;
  constructor(
    public usersserviceProvider: UsersserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.getcitas();
    this.pantalla = "cita";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HistorialPage");
    this.pantalla = "citas";
  }
  getcitas() {
    if (this.uid != null) {
      var referencia = firebase
        .database()
        .ref()
        .child("citas");
      if (this.usuariodata.tipo_usuario == 'U') {
        referencia
          .orderByChild("paciente")
          .equalTo(this.uid)
          .on("value", snap => {
            this.citas = [];
            this.vacunas = [];
            var valor = snap.val();
            for (var key in valor) {
              var cita = new Cita(valor[key], key);
              cita.getDetalles("U")
              if (cita.data.tipo == "cita") {
                this.citas.push(cita);
              } else {
                this.vacunas.push(cita);
              }
            }
            console.log(this.citas);
          });
      } else {
        referencia
          .orderByChild("veterinario")
          .equalTo(this.uid)
          .on("value", snap => {
            this.citas = [];
            this.vacunas = [];
            var valor = snap.val();
            for (var key in valor) {
              var cita = new Cita(valor[key], key);
              cita.getDetalles("V")
              if (cita.data.tipo == "cita") {
                this.citas.push(cita);
              } else {
                this.vacunas.push(cita);
              }
            }
            console.log(this.citas);
          });
      }

    } else {
      console.log("Error: no se reconoce el usuario");
      this.navCtrl.setRoot(LoginPage);
    }
  }
  cerrarSesionUser() {
    this.usersserviceProvider.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }

  irDetallesCita(cita: Cita) {
    this.navCtrl.push(DetallescitaPage, { tipo: "V", cita: cita });
  }
  darAltaVeterinario()
  {
    this.navCtrl.push(AltaveterinarioPage);
  }
}
