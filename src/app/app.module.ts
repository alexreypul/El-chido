import { AltaveterinarioPage } from './../pages/altaveterinario/altaveterinario';
import { RespuestasPage } from './../pages/respuestas/respuestas';
import { ForoPage } from './../pages/foro/foro';
import { ChatPage } from './../pages/chat/chat';
import { InicialPage } from './../pages/inicial/inicial';
import { EditarcitaPage } from './../pages/editarcita/editarcita';
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from "ionic-angular";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

//Paginas
//Añadan aqui sus paginas
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { RegistroVeterinarioPage } from "../pages/registro-veterinario/registro-veterinario";
import { SelectorRegistroPage } from "../pages/selector-registro/selector-registro";
import { OlvidoContrasenaPage } from "../pages/olvido-contrasena/olvido-contrasena";
import { HomeVeterinarioPage } from "../pages/home-veterinario/home-veterinario";
import { DetallescitaPage } from './../pages/detallescita/detallescita';
import { AgregarusuarioPage } from './../pages/agregarusuario/agregarusuario';
import { HistorialmascotaPage } from './../pages/historialmascota/historialmascota';
import { AgendarcitaPage } from './../pages/agendarcita/agendarcita';
import { HistorialPage } from './../pages/historial/historial';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';


import { Camera } from '@ionic-native/camera';


import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import * as firebase from "firebase";
import { UsersserviceProvider } from "../providers/usersservice/usersservice";
import { UsuariovePage } from '../pages/usuariove/usuariove';
import { EstadosMunicipiosProvider } from '../providers/estados-municipios/estados-municipios';

import { PerfilPage } from '../pages/perfil/perfil';
import { CrearMascotaPage } from '../pages/crear-mascota/crear-mascota';
import { MascotaPage } from "../pages/mascota/mascota";
import { ImagePicker } from '@ionic-native/image-picker';
import { MapaPage } from './../pages/mapa/mapa';


import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NotesService } from '../services/Notes.services';
import { DbProvider } from '../providers/db/db';
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImghandlerProvider } from '../providers/imghandler/imghandler';
import { CruzaPage } from '../pages/cruza/cruza';

// Initialize Firebase
export const config = {
  apiKey: "AIzaSyCKyVuC9YEFFVTWHLobr0We3jk9JzTE6gM",
  authDomain: "xoli-d8ebf.firebaseapp.com",
  databaseURL: "https://xoli-d8ebf.firebaseio.com",
  projectId: "xoli-d8ebf",
  storageBucket: "xoli-d8ebf.appspot.com",
  messagingSenderId: "626029990210"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    SelectorRegistroPage,
    RegistroVeterinarioPage,
    OlvidoContrasenaPage,
    HomeVeterinarioPage,
    PerfilPage,
    CrearMascotaPage,
    MascotaPage,
    //veterinario
    HistorialPage,
    UsuariovePage,
    AgendarcitaPage,
    HistorialmascotaPage,
    AgregarusuarioPage,
    DetallescitaPage,
    EditarcitaPage,
    AltaveterinarioPage,
    CruzaPage,

    InicialPage,
    ChatPage,
    ForoPage,
    RespuestasPage,
    //mapa
    MapaPage
  ],
  imports: [BrowserModule, 
    HttpModule, 
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    RegistroVeterinarioPage,
    SelectorRegistroPage,
    OlvidoContrasenaPage,
    HomeVeterinarioPage,
    PerfilPage,
    CrearMascotaPage,
    MascotaPage,
    CruzaPage,
     //veterinario
    HistorialPage,
    UsuariovePage,
    AgendarcitaPage,
    HistorialmascotaPage,
    AgregarusuarioPage,
    DetallescitaPage,
    AltaveterinarioPage,
    EditarcitaPage,

    InicialPage,
    ChatPage,
    ForoPage,
    RespuestasPage,
    //mapa
    MapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    CargaArchivoProvider,
    File,
    FileChooser,
    FilePath,

    
    //mapa
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UsersserviceProvider,
    EstadosMunicipiosProvider,
    AngularFireDatabase,
    NotesService,
    DbProvider,
    LocalNotifications,
    ImghandlerProvider
    
  ]
  
})
export class AppModule {
  

}
