import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';
import {Geolocation} from 'ionic-native';
import {ResourcePage} from './resource';
/*
 Generated class for the Resource page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-list',
    templateUrl: 'list.html',
    providers: [Data]
})
export class ListPage {

    shelters: any;

    showDetail(shelter: any){
        console.log(shelter);
        shelter._source.sort = shelter.sort;

        this.navCtrl.push(ResourcePage, shelter._source);
    }

    constructor(public navCtrl: NavController, private dataProvider: Data) {

        Geolocation.getCurrentPosition().then((resp) => {
            //alert(resp.coords.latitude);

            let self = this;

            this.dataProvider.getShelters(resp.coords.latitude, resp.coords.longitude, 25).then(function(data: any){

                console.log(data.hits.hits);
                self.shelters = data.hits.hits;
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });


    }

}
