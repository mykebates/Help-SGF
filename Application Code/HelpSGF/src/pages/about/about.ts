import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})

export class AboutPage {

    constructor(public navCtrl: NavController) {

        Geolocation.getCurrentPosition().then((resp) => {
            alert(resp.coords.latitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });

    }

}
