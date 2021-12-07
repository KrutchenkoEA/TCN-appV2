import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {I2User} from "../shared/interfaces";
import {AuthService} from "../shared/auth.service";
import {AuthGService} from "../shared/auth-g.service";

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
    public authG: AuthGService,
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

    const user: I2User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user.email, user.password).then(() => {
      this.form.reset()
      this.router.navigate(['/home'])
      this.submitted = false
    }).catch((err) => {
      console.log(err)
      this.submitted = false
    })
  }

}
