import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {FbAuthResponse, UGser} from "./interfaces";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AuthGService {

  public error$: Subject<string> = new Subject<string>()

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  constructor(
    public http: HttpClient
  )  { }

  login(user: UGser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken.bind),
        catchError(this.handleError.bind(this))
      )
  }

  logout(){
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }


  private setToken(response: FbAuthResponse | null) {
    if (response){
      //console.log('response', response)
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.removeItem('fb-token-exp')
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found')
        break
    }
    return throwError(error)
  }




}
