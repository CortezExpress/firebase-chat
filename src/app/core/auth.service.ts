import { Injectable }       from '@angular/core';
import { Router }           from '@angular/router';

// import * as firebase from 'firebase';
import { AngularFireAuth }  from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { error } from 'util';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.afAuth.authState.switchMap(user => {
      if(user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  } 

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log('You have signed in for Love'))
    .catch(error => console.log(error.message))
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then(user => this.updateUserData(user))
    .then(() => console.log('You have created a Love Account!'))
    .catch(error => console.log(error.message));
  }


  signOut () {
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['/']);
    });
  }


  // the reason for email, below, having possibility of null is bc twitter doesn't use email
  // if no twitter login then can delete if want. 
  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, { merge: true })
  }
}
