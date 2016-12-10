import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Data } from '../../providers/data';
import {ResourcePage} from './resource';
/*
 Generated class for the Resource page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-searchresult',
    templateUrl: 'searchresult.html',
    providers: [Data]
})
export class SearchResultsPage {

    shelters: any;

    showDetail(shelter: any){
        shelter._source.sort = shelter.sort;

        this.navCtrl.push(ResourcePage, shelter._source);
    }

    constructor(public navCtrl: NavController, private dataProvider: Data, private navParams: NavParams) {
        this.shelters = this.navParams.data;
        console.log(this.shelters);
    }

}
