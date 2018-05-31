import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { UsersserviceProvider } from "../providers/usersservice/usersservice";

import * as firebase from 'firebase';

@Injectable()
export class NotesService {
  constructor(public afDB: AngularFireDatabase) {}
  uid=UsersserviceProvider.userUID;

  public GetMascotas() {
    // retorna el Array de objetos de notes a detail.ts
    /* //SE LE PONE VALUECHANGES() 
  PARA QUE SE PUEDA USAR SUBCRIBE()
   EN EL CONSTRUCTOR DE USUARIO.TS */
    return this.afDB.list("mascotas/"+this.uid+"/").valueChanges();
  }

  public GetMascota(id) {
    return this.afDB.object("mascotas/"+ this.uid +"/" + id).valueChanges();
  }

  public GetFoto(id) {
    return this.afDB.object("fotos/"+ this.uid +"/").valueChanges();
  }

  public crearMascota(mascota) {
    //con esto creamos la nota con todas sus propiedades del obj note
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).set(mascota);
  }

  /*  
  editNote(note)-> recibimos la nota que el usuario desea editar
 */
  public editarMascota(mascota) {
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).set(mascota);
  }

  public borrarMascota(mascota) {
    this.afDB.database.ref("mascotas/"+ this.uid +"/" + mascota.id).remove();
  }
}
