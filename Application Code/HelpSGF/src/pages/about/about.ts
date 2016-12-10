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

    wifis: any;

    constructor(public navCtrl: NavController, private dataProvider: Data) {

        let self = this;
        var appData = JSON.parse( window.localStorage.getItem('wifis'));
        if(appData && appData.hits.hits.length) {
            self.wifis = appData.hits.hits;
        } else {
            Geolocation.getCurrentPosition().then((resp) => {
                this.dataProvider.getWifiHotSpots(resp.coords.latitude, resp.coords.longitude, 3).then(function(data: any){
                    //console.log(data.hits.hits);
                    self.wifis = data.hits.hits;
                });
            }).catch((error) => {
                console.log('Error getting location', error);
            });
        }
    }



}
