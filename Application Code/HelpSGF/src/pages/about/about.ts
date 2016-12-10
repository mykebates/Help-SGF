import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { Data } from '../../providers/data';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
    providers: [Data]
})

export class AboutPage {

    constructor(public navCtrl: NavController, private dataProvider: Data) {

        Geolocation.getCurrentPosition().then((resp) => {
            alert(resp.coords.latitude);

            this.dataProvider.getWifiHotSpots(resp.coords.latitude, resp.coords.longitude, 3).then(function(data: any){
                console.log(data.hits.hits);
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });


    }



}
