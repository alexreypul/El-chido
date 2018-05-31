import { HistorialPage } from './../pages/historial/historial';
import { InicialPage } from './../pages/inicial/inicial';
import { ChatPage } from './../pages/chat/chat';
import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ForoPage } from './../pages/foro/foro';


import { PerfilPage } from "../pages/perfil/perfil";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import * as firebase from "firebase";
import { HomeVeterinarioPage } from "../pages/home-veterinario/home-veterinario";
import { UsersserviceProvider } from "../providers/usersservice/usersservice";
import { MapaPage } from './../pages/mapa/mapa';
import { CruzaPage } from '../pages/cruza/cruza';

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  //pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public userService: UsersserviceProvider
  ) {
    //this.initializeApp();
    //Se declara una variable that que guarda un this, ya que firebase no reconocera el this, en cambio el that si
    var that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //this.root

        firebase
          .database()
          .ref()
          .child("users/" + user.uid)
          .on("value", snap => {
            var datos = snap.val();
           // console.log(datos);
            //console.log(user);
            UsersserviceProvider.userdata = datos;
            UsersserviceProvider.userUID = user.uid;
            if (datos != null) {
              if (datos.tipo_usuario == "V") {
                that.rootPage = HomeVeterinarioPage;
              } else {
                that.rootPage = HomePage;
              }
            }
          });

        // ...
      } else {
        // User is signed out.
        // ... this.root
        that.rootPage = LoginPage;  
      }
    });

    // used for an example of ngFor and navigation
    /*
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];*/
  }
  /*
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }*/

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  irChat(){
    this.nav.push(InicialPage);
  }  
  irCruza(){
    this.nav.push(CruzaPage);
  }

  irForo(){
    this.nav.push(ForoPage);
  }


  irCartilla(){
    this.nav.push(HistorialPage);
  }
  irPerfil()
  {
    this.nav.setRoot(PerfilPage);
  }
  irMapa()
  {
    this.nav.push(MapaPage);
  }
  cerrarSesionUser(){
    this.userService.cerrarSesion();
    this.nav.setRoot(LoginPage); 
  }
}
