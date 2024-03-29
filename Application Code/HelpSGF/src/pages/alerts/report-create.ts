import {Component} from '@angular/core';
import {NavController, ViewController, ToastController} from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Data } from '../../providers/data';


@Component({
    selector: 'page-report-create',
    templateUrl: 'report-create.html',
    providers: [Data]
})
export class ReportCreatePage {
    public base64Image: string;
    public msg: string;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController, private dataProvider: Data) {
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    sendAlert(){
        this.dataProvider.sendAlert(this.msg, "New Report Created");
        this.presentToast();
        this.viewCtrl.dismiss();
    }


    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Your report has been delivered.',
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
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
