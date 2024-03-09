import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopLevel, Usuario, Token } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://127.0.0.1:80/api1/products.php'; 
  public authUrl = 'http://127.0.0.1:80/api1/auth.php'; 
  public closeUrl = 'http://127.0.0.1:80/api1/close.php'; 
  public userUrl = 'http://127.0.0.1:80/api1/user.php'; 

  constructor(public http: HttpClient) {}

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
    const url = `${this.apiUrl}?id_prod=${id}`;
    return this.http.delete<any>(url);
  }
//este trae el id pa editar datos
  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id_prod=${id}`);
  }
//y este actualiza el producto cada q se cambia 
  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id_prod=${product.id_prod}`, product);
  }

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.userUrl);
  }

  // Método para obtener un usuario por ID
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.userUrl}/${id}`);
  }

  // Método para agregar un nuevo usuario
  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.userUrl, usuario);
  }

  // Método para actualizar un usuario existente
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.userUrl}/${usuario.id_usuario}`, usuario);
  }

  // Método para eliminar un usuario por ID
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.userUrl}/${id}`);
  }

    // Método para enviar datos por POST para autenticación
    postAuth(datos: any): Observable<any> {
      return this.http.post<any>(this.authUrl, datos);
    }

    // Método para enviar datos por POST para cerrar sesión
  postClose(datos: any): Observable<any> {
    return this.http.post<any>(this.closeUrl, datos);
  }
}
