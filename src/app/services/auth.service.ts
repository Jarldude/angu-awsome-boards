import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // optional

//firebase
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


//rxjs
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor( private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {       
            if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return of(null);
            }
        })

      )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if(credential){
      this.router.navigate(['my-boards']);
    }
    return this.updateUserData(credential.user);
   
  }

  async signInWithEmailAndPassword(email:string, password:string){
    if (email && password) {
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      if(credential){
        this.router.navigate(['my-boards']);
      }
    }
   
  }

  async createUserWithEmailAndPassword(email:string, password:string){
    if (email && password) {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if(credential){
        this.router.navigate(['my-boards']);
      }
      return this.updateUserData(credential.user);
    }
   
  }

  private extractNameFromEmail(email:string){
    var name = email.substring(0, email.lastIndexOf("@"));
    return name;
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to firestore on login
    if(!displayName){
      displayName = this.extractNameFromEmail(email);
      photoURL = 'https://api.adorable.io/avatars/40/abott@adorable.png';
    }

    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = { 
      uid, 
      email, 
      displayName, 
      photoURL
    } 

    return userRef.set( data, { merge: true })
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}
