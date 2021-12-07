import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {IUser} from "./interfaces";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";

import auth = firebase.auth;
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  user!: IUser
  userDate: any

  actionCodeSettings = {
    url: 'https://www.example.com/?email=user@example.com',
    handleCodeInApp: true
  };


  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore,
  )  { }


  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(this.userDate))
        // JSON.parse(<string>localStorage.getItem('user'))
      } else {
        localStorage.clear()
      }
    })
  }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        // this.setUserData(res.user)
        console.log('login', res.user)
      })
      .catch(err => console.log('err',err))
  }

  async logout(){
    await this.afAuth.signOut()
    localStorage.removeItem('user')
    await this.router.navigate(['/login'])
    console.log('logout', this.userDate)
  }



  async register(email: string, password: string)  {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        // this.setUserData(res.user)
        console.log('User create', res)
      })
      .catch(err => console.log('err',err))
    await this.afAuth.sendSignInLinkToEmail(email, {url:'www.www'})
      .then(res=> console.log('Send link to email', res))
      .catch(err => console.log('err',err))
  }

  async sendPassVer(email: string) {
    await this.afAuth.sendPasswordResetEmail(email, this.actionCodeSettings)
      .then(res => console.log('Login complete', res))
      .catch(err => console.log('err',err))
  }

  get isAuthentificated(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'))
    // return (user !== null && user.emailVerified !== false)
    return true
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    await this.router.navigate(['/home'])
  }


  setUserData(user: IUser) {
    const userState: IUser = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      uid: user.uid,
    }
    return console.log('userState', userState)
  }


  // login(user: IUser): Observable<any> {
  //   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
  //     .pipe(
  //       tap(this.setToken),
  //       catchError(this.handleError.bind(this))
  //     );
  // }

}









