import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import * as firebase from "firebase";

@Injectable()
export class UsersserviceProvider {
  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public static userdata: any;
  public static userUID: any;
  
  constructor(public http: Http) {
    this.fireAuth = firebase.auth();

    this.userProfile = firebase.database().ref("users");
  }

  loginUserService(email: string, password: string): any {
    //Iniciando sesion
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUserService(account: {}) {
    //Creacion del usuario
    return this.fireAuth
      .createUserWithEmailAndPassword(account["email"], account["contrasena"])
      .then(newUser => {
        //Iniciando sesion
        this.fireAuth
          .signInWithEmailAndPassword(account["email"], account["contrasena"])
          .then(authenticatedUser => {
            //Inicio de sesión existoso, guardando vector con datos del user
            this.userProfile.child(authenticatedUser.uid).set(account);
          });
      });
  }

  cerrarSesion() {
    this.fireAuth.signOut();
  }

  
  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
        this.fireAuth.auth.currentUser.updateProfile({
            displayName: this.fireAuth.auth.currentUser.displayName,
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.fireAuth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })  
    })
    return promise;
}

  resetearContrasena(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
      /*.then(function() {
        //Exito
      })
      .catch(function(error) {
        // Un error ocurrio
      });*/
  }
}
