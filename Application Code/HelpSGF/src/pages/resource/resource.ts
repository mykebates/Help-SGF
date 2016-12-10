import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Resource page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-resource',
  templateUrl: 'resource.html'
})
export class ResourcePage {
  shelter: any;
  constructor(public navCtrl: NavController, private navParams: NavParams) {
      this.shelter = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello ResourcePage Page');
  }

}
