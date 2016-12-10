import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
    selector: 'page-alert-create',
    templateUrl: 'alert-create.html'
})

export class AlertCreatePage {
    public base64Image: string;
    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getPicture(){
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 600,
            targetHeight: 600,
            allowEdit : false,
            saveToPhotoAlbum : false,
            correctOrientation: true
        }).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }
}
