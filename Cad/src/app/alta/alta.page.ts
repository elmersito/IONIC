import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.page.html',
  styleUrls: ['./alta.page.scss'],
})
export class AltaPage implements OnInit {
  @Input() product: any; 

  constructor(private apiService: ApiService, 
              private route: ActivatedRoute,
              private toastController: ToastController,
              private modalController: ModalController
               ) {}

  ngOnInit() {
  }

  async submitForm(): Promise<void> {
    this.apiService.updateProduct(this.product).subscribe(
      async (response) => {
        console.log('Producto actualizado:', response);
        const toast = await this.toastController.create({
          message: 'Producto actualizado correctamente',
          duration: 2000,
          position: 'middle'
        });
        toast.present();

        // Esperar hasta que se cierre el mensaje emergente
        await toast.onDidDismiss();

        // Cerrar la modal
        this.dismissModal();
      },
      async (error) => {
        console.error('Error al actualizar el producto:', error);
        const toast = await this.toastController.create({
          message: '¡Upss!, eso no salio como esperabamos, intenta de nuevo',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
    );
  }

  dismissModal() {
    // Cerrar la modal
    this.modalController.dismiss();
  }
}
