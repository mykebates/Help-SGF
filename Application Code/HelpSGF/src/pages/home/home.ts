import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Data]
})
export class HomePage {

  constructor(public navCtrl: NavController,  private dataProvider: Data) {

  }


  onTestButtonClick(){
    this.dataProvider.getTestData().then(function(data: any){
      console.log(data.hits.hits);
    });

  }
}
