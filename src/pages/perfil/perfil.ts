import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, AlertController, LoadingController, normalizeURL, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { MascotaPage } from "../mascota/mascota";
import { CrearMascotaPage } from "../crear-mascota/crear-mascota";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NotesService } from '../../services/Notes.services';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { ImagePicker} from '@ionic-native/image-picker';


/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  @ViewChild(Nav) nav: Nav;


imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
moveon = true;

  uid = UsersserviceProvider.userUID;
  bandera = 0;
  id = null;

  fotos: any = { 
    fotoPerfil: null,
    activa: null 
    };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersserviceProvider,
    private camera:Camera,
    public NotesService: NotesService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public imgservice: ImghandlerProvider,
    public zone: NgZone,
    public afDB: AngularFireDatabase,
    public firebaseService: NotesService,
    public imagePicker: ImagePicker,
    public toastCtrl: ToastController,) {

    firebase.auth().onAuthStateChanged(function(user) {
    });

    this.getFoto();
/*
    this.id = navParams.get("id");
      if (this.id != 0) {
        NotesService.GetMascota(this.id).subscribe(mascota => {
          this.mascota = mascota;
        });
      }

     
    if(this.bandera == true)
    {
      
    } else{
      this.bandera = this.crearFoto(this.bandera);
    }
    */
  }


  ////////////////////////////////////////
  tomarFoto(): void
  {
    this.camera.getPicture({
      quality : 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 900,
      targetHeight: 900,
      saveToPhotoAlbum: true

    }).then(image => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref('fotos/'+this.uid+'/fotoPerfil.png');
      selfieRef
      .putString(image, 'base64', {contentType: 'image/png'})
      .then(savedProfilePicture => {
        firebase
          .database()
          .ref('fotos/'+this.uid+'/fotoPerfil/')
          .set(savedProfilePicture.downloadURL);
      });
      this.bandera = 1;
      
      
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
      
    });
   
    this.moveon = false;
  }

  tomarGaleria(): void
  {
    let loader = this.loadingCtrl.create({
      content: 'Espera un momento.'
    })
    loader.present();
    this.camera.getPicture({
      quality : 100,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 900,
      targetHeight: 900,
      saveToPhotoAlbum: true

    }).then(image => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref('fotos/'+this.uid+'/fotoPerfil.png');
      selfieRef
      .putString(image, 'base64', {contentType: 'image/png'})
      .then(savedProfilePicture => {
        firebase
          .database()
          .ref('fotos/'+this.uid+'/fotoPerfil/')
          .set(savedProfilePicture.downloadURL);
      });
      this.bandera = 1;
      
      
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
      
    });
    setTimeout(() => {
      loader.dismiss();
    }, 3000);
   
    this.moveon = false;

  }

  
  crearFoto()
  {
    firebase.storage().ref().child('fotos/icon-user-default.png').getDownloadURL().then(
      (url)=>{
        this.imgurl = url;
      })
  }


  getFoto()
  {
       firebase.storage().ref().child('fotos/'+this.uid+'/fotoPerfil.png').getDownloadURL().then(
      (url)=>{
        this.imgurl = url;
      });
}


  ionViewDidLoad() {  
    
    console.log('ionViewDidLoad PerfilPage');
  }

  irMascota()
  {
    if (this.id != 0)
    {
      this.navCtrl.push(MascotaPage, {id: 0});
    } else
    {
      this.mostrarAlerta("Espera", "Antes debes agregar una mascota");
    }

  }

  crearMascota()
  {
    this.navCtrl.push(CrearMascotaPage, { id: 0 });
  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }

////////////////////////////////////////////7


chooseimage() {
  let loader = this.loadingCtrl.create({
    content: 'Espera un momento.'
  })
  loader.present();
  this.imgservice.uploadimage().then((uploadedurl: any) => {
    loader.dismiss();
    this.zone.run(() => {
      this.imgurl = uploadedurl;
      this.moveon = false;
    })
  })
}

updateproceed() 
{
  /*let loader = this.loadingCtrl.create({
    content: 'Espera un momento.'
  })
  loader.present(); */
  this.proceed();
    
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
  //loader.dismiss();
}



proceed() {
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

}
