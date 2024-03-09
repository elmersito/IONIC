import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {
  correo: string;
  contrasena: string;
  error: string;

  constructor(private router: Router, private http: HttpClient) {
    this.correo = '';
    this.contrasena = '';
    this.error = '';
  }

  login() {
    const correo = this.correo;
    const contrasena = this.contrasena;

    this.http.get<any>(`http://127.0.0.1:80/api1/method.php?correo=${correo}&contrasena=${contrasena}`).subscribe(
      (response) => {
        if (response && response.length > 0) {
          const USERDATA = response[0];
          const correoRespuesta = USERDATA.correo;
          const contrasenaRespuesta = USERDATA.contrasena;
          console.log(USERDATA);

          if (contrasenaRespuesta === contrasena) {
            // Credenciales válidas, redirigir al usuario al "home"
            this.router.navigate(['/tabs']);
          } else {
            // Credenciales inválidas, mostrar un mensaje de error
            this.error = 'Credenciales incorrectas';
          }
        } else {
          // No se encontraron datos en la respuesta, mostrar un mensaje de error
          this.error = 'No se encontraron datos';
        }
      },
      (error) => {
        // Error al realizar la solicitud, mostrar un mensaje de error
        console.error('Error al iniciar sesión:', error);
        this.error = 'Error al iniciar sesión';
      }
    );
  }
}
