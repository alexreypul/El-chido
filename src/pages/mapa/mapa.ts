import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
declare var google;
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
 
  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  nearbyItems: any = new Array<any>();
  loading: any;
 

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController
  ) {
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
  }
  

  ionViewDidEnter(){
     this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 19.1970405, lng: -99.5175304},
      zoom: 15
      
    });
    //this.clearMarkers();
    
    /*this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
     let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      });
      //this.addMarker();
     
    }, (err) => {
      console.log(err);
    });*/

}
addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h4>Information!</h4>";         
 
  this.addInfoWindow(marker, content);
 
}
crearMarcador(place)
 {

   let marker = new google.maps.Marker({
     map: this.map,
     position: place.geometry.location
   });
   let content = "<h4>Information!</h4>";         
 
  this.addInfoWindow(marker, content);
}
addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

tryGeolocation(){
  this.loading.present();
  this.clearMarkers();//remove previous markers

  this.geolocation.getCurrentPosition().then((resp) => {
    let pos = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    };
    let marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      title: 'I am here!'
    });
    this.markers.push(marker);
    this.map.setCenter(pos);
    this.loading.dismiss();

  }).catch((error) => {
    console.log('Error getting location', error);
    this.loading.dismiss();
  });
}

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item){
   
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        this.clearMarkers();
        this.GooglePlaces.nearbySearch({
          location: results[0].geometry.location,
          radius: '1000',
          types: ['veterinary_care'], //check other types here https://developers.google.com/places/web-service/supported_types
          key: 'AIzaSyBa-glGSrpAngfvbpGtu7s7JcsoFox0HeE'
        }, (near_places) => {
          this.zone.run(() => {
            this.nearbyItems = [];
            for (var i = 0; i < near_places.length; i++) {      
              this.crearMarcador(near_places[i]);
            }
            this.loading.dismiss();
          });
        })
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
          
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    })
  }
  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

}

