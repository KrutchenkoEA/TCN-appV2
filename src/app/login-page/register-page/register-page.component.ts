import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {IGUser, IUser} from "../../shared/interfaces";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form!: FormGroup
  submitted = false
  emailSend = false

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null,[
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null,[
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  get email() {
    // console.log(this.form.controls)
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  submit() {
    console.log('this.form.value',this.form.value)

    if (this.form.invalid){
      return
    }

    this.submitted = true
    this.emailSend = true

    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.register(user).then(() => {
      this.form.reset()
      this.submitted = false
    })

  }


}
