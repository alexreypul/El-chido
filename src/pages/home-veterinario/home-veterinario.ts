import { Component } from '@angular/core';
import { MenuController,NavController, NavParams } from 'ionic-angular';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { LoginPage } from "../login/login";

import { HistorialPage } from '../historial/historial';
import { UsuariovePage } from '../usuariove/usuariove';

@Component({
  selector: 'page-home-veterinario',
  templateUrl: 'home-veterinario.html',
  providers: [UsersserviceProvider]
})

export class HomeVeterinarioPage {

  tab1Root = HistorialPage;
  tab2Root = UsuariovePage;
  constructor(public menuCtrl: MenuController,public usersserviceProvider: UsersserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(false);
  }

  cerrarSesionUser() {
    this.usersserviceProvider.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }

}




