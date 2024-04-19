import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/models';
import { Observable, map, of } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth, private firestore: AngularFirestore,
    private auth: AngularFireAuth) { }

  login(email: string, password: string){
    return this.authfirebase.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.authfirebase.signOut();
  }

  register(data: User){
    return this.authfirebase.createUserWithEmailAndPassword(data.email, data.password);
  }

  stateUser(){
    return this.authfirebase.authState
  }

  
  
  getCurrentUser(): Observable<User | null> {
    return this.auth.authState.pipe(
      filter(user => !!user), // Filtra los valores nulos y undefined
      switchMap(user => {
        return this.firestore.doc<User>(`Users/${user!.uid}`).valueChanges();
      }),
      // Manejo de valores nulos (opcional)
      switchMap(user => {
        if (user) {
          return of<User>(user); // Emitir el usuario
        } else {
          return of<User | null>(null); // Emitir null si el usuario no existe
        }
      })
    );
  }
  

}

