import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {
  username: string;
  password: string;
  error: string;

  constructor(private router: Router) {
    this.username = '';
    this.password = '';
    this.error = '';
  }

  login() {
    // Verificamos los datos de inicio de sesión
    if (this.username === 'usu' && this.password === 'co') {
      console.log('Inicio de sesión exitoso');
      // Redirigimos al usuario a otra página después de iniciar sesión
      this.router.navigate(['/tabs/tab1']); // Cambia '/tabs/tab1' por la ruta a la página deseada
    } else {
      this.error = 'Nombre de usuario o contraseña incorrectos';
    }
  }
}
