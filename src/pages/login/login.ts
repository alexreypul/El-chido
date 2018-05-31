import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController,
  MenuController
} from "ionic-angular";
import { SelectorRegistroPage } from "../selector-registro/selector-registro";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import { OlvidoContrasenaPage } from "../olvido-contrasena/olvido-contrasena";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
  providers: [UsersserviceProvider]
})
export class LoginPage {
  public email: string;
  public password: string;
  public acceso: boolean;

  constructor(
    public usersService: UsersserviceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public menu: MenuController
  ) {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }
  validarCampos() {
    if (
      this.email == null ||
      this.password == null ||
      this.email == "" ||
      this.password == ""
    ) {
      this.mostrarAlerta("Error", "Completa todos los campos");
      this.acceso=false;
    } else {
      this.acceso=true;
    }
  }
  submitLogin() {
    this.validarCampos();
    if (this.acceso) {
      var that = this;
      var loader = this.loadingCtrl.create({
        content: "Iniciando sesión..."
      });
      loader.present();

      this.usersService.loginUserService(this.email, this.password).then(
        authData => {
          //successful
          loader.dismiss();
          //that.navCtrl.setRoot(HomePage);
        },
        error => {
          loader.dismiss();
          // Unable to log in
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: "top"
          });
          toast.present();

          that.password = ""; //empty the password field
        }
      );
    }
  }

  olvidoContrasena() {
    this.navCtrl.push(OlvidoContrasenaPage);
  }

  redirectToSignup() {
    this.navCtrl.push(SelectorRegistroPage);
  }
}
