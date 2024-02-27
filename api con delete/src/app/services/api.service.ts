import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopLevel } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/method.php'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getTopHeadlines(): Observable<TopLevel[]> {
    return this.http.get<TopLevel[]>(this.apiUrl);
  }

  // Método para enviar datos por POST
  postDatos(datos: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, datos);
  }

  // Método para eliminar datos por ID
  deleteDato(id: number): Observable<any> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.delete<any>(url);
  }
}
