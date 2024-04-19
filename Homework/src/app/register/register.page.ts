import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/models';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  data: User = {
    uid: '',
    name: '',
    email: '',
    password: ''
  }

  constructor(private http: HttpClient, private router: Router, private auth: AuthService, private firestore: FirestoreService, private interaction: InteractionService) {}

  async registerFireBase() {
    console.log('data ->', this.data);
    this.interaction.presentLoading('Registrando...');
    
    try {
      const res = await this.auth.register(this.data);
      if (res && res.user && res.user.uid) {
        this.interaction.closeLoading();
        console.log('Usuario registrado');
        const userId = res.user.uid;
        this.data.uid = userId;
        const path = 'Users';
        await this.firestore.createDoc(this.data, path, userId);
        this.interaction.presentToast('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error:', error);
      this.interaction.presentToast('Usuario repetido');
      this.interaction.closeLoading();
    }
  }
  
  login() {
    this.router.navigate(['/login']);
  }
}
