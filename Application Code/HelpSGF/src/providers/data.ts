import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  alert_server: string;

  constructor(public http: Http, private platform: Platform) {


    if (platform.is('cordova')) {
      this.es_server = "http://192.168.0.137:9200/"
      this.alert_server = "https://api.ionic.io/"
    } else {
      this.es_server = "/api/";
      this.alert_server = "/alert/";
    }
  }

    sendAlert(message: string, title: string){

        let headers      = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YzhkZDIyNi02MjM3LTRhYzktOGVmMS0zODk1MTg1MDE1MmQifQ.Jb_yZNppY0KONYX6sAtBOvmAIb21kGCw9eB7DiDV01w'
        }); // ... Set content type to JSON

        let options = new RequestOptions({ headers: headers }); // Create a request option


        let query = {
            "profile": "dev",
            "notification": {
                "message": message,
                "ios": {
                    "message": message,
                    "sound": "default",
                    "title": title,
                    "payload": {"some": "thing"}
                },
            },
            "send_to_all":true
        };

        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.post(this.alert_server + 'push/notifications', query, options)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    shelterSearch(text: string){

        let query = {
            "from" : 0, "size" : 100,
            "query": {
                "multi_match" : {
                    "query":  text,
                    "fields": [ "name", "address1", "services" ]
                }
            }
        };

        return new Promise(resolve => {

            this.http.post(this.es_server + 'hack4goodsgf/shelter/_search', query)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });


    }


    getShelters(lat: number, lon: number, distance: number){
        let query =  {
            "from" : 0, "size" : 100,
            "query": {
                "bool" : {
                    "must" : {
                        "match_all": {}
                    },
                    "filter" : {
                        "geo_distance" : {
                            "distance" : distance + "mi",
                            "location" : {
                                "lat" : lat,
                                "lon" : lon
                            }
                        }
                    }
                }

            },

            "sort" : [
                {
                    "_geo_distance" : {
                        "location" : [lon, lat],
                        "order" : "asc",
                        "unit" : "miles",
                        "mode" : "min",
                        "distance_type" : "sloppy_arc"
                    }
                }
            ]
        };

        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.post(this.es_server + 'hack4goodsgf/shelter/_search', query)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    getWifiHotSpots(lat: number, lon: number, distance: number){
        let query =  {
            "from" : 0, "size" : 100,
            "query": {
                "bool" : {
                    "must" : {
                        "term": {
                            "resource_type": "wifi"
                        }
                    },
                    "filter" : {
                        "geo_distance" : {
                            "distance" : distance + "mi",
                            "location" : {
                                "lat" : lat,
                                "lon" : lon
                            }
                        }
                    }
                }
            },
            "sort" : [
                {
                    "_geo_distance" : {
                        "location" : [lon, lat],
                        "order" : "asc",
                        "unit" : "miles",
                        "mode" : "min",
                        "distance_type" : "sloppy_arc"
                    }
                }
            ]
        };


        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.post(this.es_server + 'hack4goodsgf/other_resources/_search', query)
                .map(res => res.json())
                .subscribe(data => {
                    //window.localStorage.setItem( ‘app-name’, JSON.stringify(appData));
                    window.localStorage.setItem('wifis', JSON.stringify(data));
                    resolve(data);
                });
        });
    }



}
