import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private interaction: InteractionService) {

  }

  ngOnInit() {
  }

  credentials = {
    email: '',
    password: '',
    name: ''
  }

  async loginFireBase(){
    await this.interaction.presentLoading('Cargando...');
    

    const res = await this.auth.login(this.credentials.email, this.credentials.password).catch(error =>{
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('Usuario o contraseña incorrectos');
    })
    if (res){
      console.log(res);
      this.interaction.presentToast('Autenticación correcta');
      this.router.navigate(['/home']);
      this.interaction.closeLoading();

    }
  }

  register(){
    this.router.navigate(['/register']);
  }
}
