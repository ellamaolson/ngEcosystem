import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.component.html',
  styleUrls: ['./admin-console.component.css'],
})
export class AdminConsoleComponent {
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public afAuth: AngularFireAuth) {}

  login() {
    console.log('Logging in with email + password');
    this.afAuth.auth
      .signInWithEmailAndPassword(this.userForm.value.email, this.userForm.value.password)
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('Entered in wrong username or password.')
        } else {
          alert(error.message);
        }
        console.log('Error: ', error);
      });
  }

  logout() {
    this.userForm.reset();
    this.afAuth.auth.signOut();
  }

  // To include Google login:
  // loginGoogle() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }
  // <button (click)="loginGoogle()">Login with Google</button>
}
