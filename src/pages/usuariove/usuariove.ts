import { AgregarusuarioPage } from './../agregarusuario/agregarusuario';
import { HistorialmascotaPage } from './../historialmascota/historialmascota';
import { Usuario } from './../../clases/Usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

/**
 * Generated class for the UsuariovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuariove',
  templateUrl: 'usuariove.html',
})
export class UsuariovePage {
  uid=UsersserviceProvider.userUID;
  usuarioData=UsersserviceProvider.userdata;
  referencia: any;
  pacientes=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.getPacientes();
    console.log(this.usuarioData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuariovePage');
  }

  
  getPacientes(){
    var key;
    var refEnVeterinario=firebase.database().ref().child("users/"+this.uid+"/pacientes");
    refEnVeterinario.on("value",(snap)=>{
      this.pacientes=[];
      for(key in snap.val()){
        console.log("usuario "+key)
        var refEnPaciente=firebase.database().ref().child("users/"+key)
        refEnPaciente.once("value",(snap2)=>{
          var usuario=new Usuario(snap2.val(),snap2.key);
          usuario.getmascotas();
          this.pacientes.push(usuario);
        });
      }
    });
  }

  toggleMascotasVisibles(usuario){
    if(usuario.mascotasVisibles){
      usuario.mascotasVisibles=false;
    }else{
      if(usuario.mascotas.length==0){
        usuario.getmascotas();
        console.log("mascotas obtenidas");
      }
      usuario.mascotasVisibles=true;
    }
  }

  test(){
    var fecha=new Date();
    var tiempo=fecha.toUTCString();
    console.log("boton presionado "+tiempo);
  }

  eliminarPacientes(index,paciente){
    let confim=this.alertCtrl.create({
      title:"Eliminar",
      message:"Desea eliminar este elemento",
      buttons:[
        {
          text: "Cancelar",
          handler:()=>{
            this.toggleMascotasVisibles(paciente);  
          }
        },
        {
          text: "Aceptar",
          handler:()=>{
            firebase.database().ref().child("users/"+this.uid+"/pacientes/"+paciente.key).remove();
          }
        }
      ]
    });
    confim.present();
  }
  
  irhistorialmascota(mascota,paciente){
    this.navCtrl.push(HistorialmascotaPage,{"mascota":mascota,"paciente":paciente});
  }
  irAddUsuario(){
    this.navCtrl.push(AgregarusuarioPage);
  }
}
