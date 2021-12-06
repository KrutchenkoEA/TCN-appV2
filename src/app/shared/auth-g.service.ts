// import {Injectable, OnInit} from '@angular/core';
// import {Router} from "@angular/router";
// import {AngularFireAuth} from "@angular/fire/compat/auth";
// import {from, Observable, Subject, throwError} from "rxjs";
// import {IUser} from "./interfaces";
// import {AngularFirestore} from "@angular/fire/compat/firestore";
// import firebase from "firebase/compat/app";
// import {HttpErrorResponse} from "@angular/common/http";
// import auth = firebase.auth;
// import {catchError} from "rxjs/operators";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService implements OnInit{
//
//   user!: IUser
//   userState: any
//   public error$: Subject<string> = new Subject<string>()
//
//   constructor(
//     public afAuth: AngularFireAuth,
//     private router: Router,
//     public afs: AngularFirestore,
//   )  {  }
//
//   ngOnInit(): void {
//     this.afAuth.authState.subscribe(user => {
//       if (user) {
//         localStorage.setItem('user', JSON.stringify(this.userState))
//         JSON.parse(<string>localStorage.getItem('user'))
//       } else {
//         localStorage.clear()
//       }
//     })
//   }
//
//   login(user: IUser): Observable<any> {
//     const res$ =  from(this.afAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(catchError(this.handleError.bind(this)))
//     console.log('Login complete', res$)
//
//     return res$
//     //   .then(res => console.log('Login complete', res))
//     //   .catch(() => this.handleError.bind(this))
//     // await this.setUserData(user)
//     // await this.router.navigate(['/home'])
//   }
//
//   async register(user: IUser)  {
//     const res = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
//       .then(res => console.log('User create', res))
//     await this.setUserData(user)
//     const res2 = await this.afAuth.sendSignInLinkToEmail(user.email, {url:'www.www'})
//       .then(res2 => console.log('Send link to email', res2))
//   }
//
//   async sendPassVer(email: string) {
//     const res = await this.afAuth.sendPasswordResetEmail(email, null)
//       .then(res => console.log('Login complete', res))
//   }
//
//   async logout() {
//     await this.afAuth.signOut()
//     localStorage.removeItem('user')
//     await this.router.navigate(['/login'])
//   }
//
//   get isAuthentificated(): boolean {
//     const user = JSON.parse(<string>localStorage.getItem('user'))
//     return (user !== null && user.email_verified !== false)
//   }
//
//   async loginWithGoogle() {
//     await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
//     await this.router.navigate(['/home'])
//   }
//
//
//   setUserData(user: IUser) {
//     const userState: IUser = {
//       email: user.email,
//       password: user.password,
//     }
//     return console.log('userState', userState)
//   }
//
//   private handleError(error: HttpErrorResponse) {
//     const {message} = error.error.error
//     switch (message) {
//       case 'INVALID_EMAIL':
//         this.error$.next('Invalid Email')
//         break
//       case 'INVALID_PASSWORD':
//         this.error$.next('Invalid Password')
//         break
//       case 'EMAIL_NOT_FOUND':
//         this.error$.next('Email not found')
//         break
//     }
//     return throwError(error)
//   }
//
// }
