import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  passSend = false
  email!: FormControl


  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.email])

  }
  submit() {
    console.log('this.form.value', this.email.value)
    this.passSend = true
    this.auth.sendPassVer(this.email.value)
  }

}

