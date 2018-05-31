import { Component, ViewChild } from '@angular/core';
import { UsersserviceProvider } from './../../providers/usersservice/usersservice';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { RespuestasPage } from '../respuestas/respuestas';

@IonicPage()
@Component({
  selector: 'page-foro',
  templateUrl: 'foro.html',
})
export class ForoPage {

  ref: any;
  rfc: firebase.database.Reference;
  categoriaElegida: string = "";
  foro: any;
  categoria: any;
  @ViewChild("content") content: any;
  usuario: string = "";
  hora: any;
  dia: any;
  pub: string = "";
  pubs = [];
  referencia = firebase.database().ref().child("publicaciones");
  idPublicacion: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
    this.eligeForo();
    this.usuario = UsersserviceProvider.userdata.nombre
  }

  getPublicaciones(catForo: string) {
    this.rfc = firebase.database().ref().child("publicaciones").child(catForo);
    this.rfc.on("value", (snap) => {
      var data = snap.val();
      this.pubs = [];
      for (var key in data) {
        if (data[key].categoria == catForo) {
          
          console.log(data[key].id+" "+catForo);
          this.rfc = firebase.database().ref().child("publicaciones").child(catForo).child(data[key].id).child("respuestas");
          var resps = [];
            this.rfc.on("value", (snap2) => {
              var data2 = snap2.val();
              for (var key2 in data2) {
                  resps.push(data2[key2]);
              }
            });
            console.log(resps.length+" Respuestas");
            data[key].publicacion = data[key].publicacion +" ("+resps.length+" Respuestas)";
            this.pubs.push(data[key]);
        }
      }
      this.scrollToBotton();
    });
  }

  scrollToBotton() {
    var contentend = document.getElementById("Contentend").offsetTop;
    this.content.scrollTo(0, contentend, 300);
  }

  eligeForo() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Selecciona un Foro');
    alert.addInput({ type: 'radio', label: 'Alimentacion', value: 'alimentacion', checked: true });
    alert.addInput({ type: 'radio', label: 'Cuidados', value: 'cuidados' });
    alert.addInput({ type: 'radio', label: 'Vacunas', value: 'vacunas' })
    alert.addButton({
      text: 'OK',
      handler: foroElegido => {
        if (foroElegido == "alimentacion") {
          this.getPublicaciones("alimentacion");
        } else {
          if (foroElegido == "cuidados") {
            this.getPublicaciones("cuidados");
          } else {
            if (foroElegido == "vacunas") {
              this.getPublicaciones("vacunas");
            }
          }
        }
        this.categoriaElegida = foroElegido;        
      }
    });
    alert.present();
  }

  muestarespuestas(idpub, categoria) {
    this.navCtrl.push(RespuestasPage, { id: idpub, cat: categoria, usuario: this.usuario });
    console.log(idpub);
    console.log(categoria);
  }

  sendPublicaciones() {
    var fecha = new Date();
    this.dia = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
    this.hora = fecha.getHours() + ":" + fecha.getMinutes();
    this.ref = firebase.database().ref().child("publicaciones").child(this.categoriaElegida);
    this.idPublicacion = this.ref.push().key;
    this.ref.child(this.idPublicacion).set({
      publicacion: this.pub,
      usuario: this.usuario,
      dia: this.dia,
      hora: this.hora,
      categoria: this.categoriaElegida,
      id: this.idPublicacion
    });

    this.pub = "";
  }
}
