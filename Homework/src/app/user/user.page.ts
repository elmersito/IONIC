import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { InteractionService } from '../services/interaction.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/models';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  users$: Observable<any[]>;
  currentUser: User | null=null;

  constructor(
    private auth: AuthService,
    private interaction: InteractionService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {this.users$ = this.firestore.collection('Users').valueChanges();  }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      this.currentUser = user as User;
    });
  }

  async logout() {
    await this.interaction.presentLoading('Cerrando sesion...');
    this.auth.logout();
    this.router.navigate(['/login']);
    this.interaction.closeLoading();
  }
}
