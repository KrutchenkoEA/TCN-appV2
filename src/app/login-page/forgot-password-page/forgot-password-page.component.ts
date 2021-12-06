import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  passSend: boolean = false
  email!: FormControl

  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.email])

  }

  send() {
    console.log('qqq')
    console.log(this.email.value)

    this.passSend = true
    this.auth.sendPassVer(this.email.value)
  }


}

