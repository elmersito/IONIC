import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { TopLevel } from '../../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public resp: TopLevel[] = [];

  constructor(private apiService: ApiService) {}

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
  

}
