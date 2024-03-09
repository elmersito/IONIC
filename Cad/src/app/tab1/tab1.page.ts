import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TopLevel } from '../interface';
import { ModalController } from '@ionic/angular';
import { AltaPage } from '../alta/alta.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  product: any = {
    id_prod: null,
    nombre: '',
    tipo: '',
    sku: '',
    caducidad: '',
    descripcion: '',
    stock: null
  };

  public resp: TopLevel[] = [];

  constructor( private modalController: ModalController,
    private apiService: ApiService,
  ) {}



  ngOnInit() {
    this.loadTopHeadlines();
  }

  loadTopHeadlines() {
    this.apiService.getTopHeadlines().subscribe(
      (resp) => {
        console.log(resp);
        this.resp = resp;
      },
      (error) => {
        console.error('Aquí deberian estar tus datos:', error);
      }
    );
  }

  deleteItem(id: number) {
    this.apiService.deleteDato(id).subscribe(
      () => {
        console.log('Borrado exitoso');
        // Después de la eliminación, recargar los titulares
        this.loadTopHeadlines();
      },
      (error) => {
        console.error('Este registro no se quiere ir, intenta de nuevo:', error);
      }
    );
  }

  async openCustomDialog2(product: any) {
    const modal = await this.modalController.create({
      component: AltaPage, // Reemplaza ExampleModalPage por el nombre de tu página modal
      componentProps: {
        product: product // Pasar el ítem seleccionado a la página modal
      }
    });
    return await modal.present();
  }

}
