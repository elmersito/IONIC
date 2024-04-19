import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  async presentLoading(message: string, color: string = 'tertiary') {
    const loading = await this.loadingController.create({
      message: message,
      cssClass: 'custom-loading',
      spinner: 'circles',
      duration: 2000,
      translucent: true,
      backdropDismiss: false
    });
    await loading.present();
  }

  async closeLoading() {
    await this.loadingController.dismiss();
  }

  async presentToast(message: string, color: string = '#504363') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
