import { Component, ViewChild,  } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform  } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import * as firebase from 'firebase';
import { InicialPage } from '../inicial/inicial';

import { AngularFireDatabase } from 'angularfire2/database';
import { NotesService } from '../../services/Notes.services';
/**
 * Generated class for the CruzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-cruza',
  templateUrl: 'cruza.html',
})
export class CruzaPage {
  @ViewChild(Nav) nav: NavController;
  mascota ={
    raza: "coli",
    sexo:'Macho'
    
  };
  
  uid = UsersserviceProvider.userUID;
  rfc: firebase.database.Reference;
 nombre: any
 usus=[];
 mascotas = [];
 
  usuariosdata = UsersserviceProvider.userdata;
  usuarios={
    nombre: this.usuariosdata.nombre

  };

  constructor(    public afDB: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    public notesServices: NotesService) {
   
    this.usuariosdata = UsersserviceProvider.userdata;
    this.usuarios={
      nombre: this.usuariosdata.nombre
      
  
    };
    this.rfc = firebase.database().ref().child("users");
    this.rfc.orderByChild("tipo_usuario").equalTo('U').on("value", (snap) => {
      var data = snap.val();

      for (var key in data) {
          console.log(data[key].nombre);
       
          this.usus.push(data[key]);
      }
    });
    this.getMascota();

    notesServices.GetMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;

    });
  }

  irChat(indice){
      this.navCtrl.push(InicialPage,indice);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CruzaPage');
  }

  getMascota()
  {
    return this.afDB.list('mascotas/'+this.uid).valueChanges();
  }
}
