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
        console.error('Error fetching top headlines:', error);
      }
    );
  }

  deleteItem(id: number) {
    this.apiService.deleteDato(id).subscribe(
      () => {
        console.log('Item deleted successfully');
        // Después de la eliminación, recargar los titulares
        this.loadTopHeadlines();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

}
