import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  es_server: string;
  
  constructor(public http: Http, private platform: Platform) {
    console.log('Hello MyData Provider');

    console.log(platform.is('web'));

    if (platform.is('cordova')) {
      this.es_server = "http://192.168.0.137:9200/"
    } else {
      this.es_server = "/api/";
    }
  }

  getTestData(){

    var query = {
      "query": {
        "match_all": {}
      }
    };


    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      this.http.post(this.es_server + 'tap_salesportal_0y5eaxcgcb/_search', query)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}