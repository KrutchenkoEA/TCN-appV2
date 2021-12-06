import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {IGUser, IUser} from "../shared/interfaces";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  form!: FormGroup
  submitted = false
  message! : string


  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((params:Params) => {
      if (params['loginAgain']) {
        this.message = 'Please login'
      } else if (params['authFailed']) {
        this.message = 'Session is close, enter Email again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    console.log('this.form.value',this.form.value)

    this.submitted = true

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    // this.auth.login(user).then(() => {
    //   this.form.reset()
    //   this.router.navigate(['/home'])
    //   this.submitted = false
    // }).catch((err) => {
    //   console.log(err)
    //   this.submitted = false
    // })

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/home'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }

}
