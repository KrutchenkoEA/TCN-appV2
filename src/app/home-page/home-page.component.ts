import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  form!: FormGroup
  submitted = false

  indications = [123, 456, 789]
  tarif = [1.32, 23, 47]



  constructor() {

  }



  ngOnInit(): void {
    this.form = new FormGroup({
      smth1: new FormControl(null, Validators.pattern(/^[0-9]+(?!.)/)),
      smth2: new FormControl(null, Validators.pattern(/^[0-9]+(?!.)/)),
      smth3: new FormControl(null, Validators.pattern(/^[0-9]+(?!.)/)),
    })
  }


  get smth1() {
    return this.form.get('smth1')
  }
  get smth2() {
    return this.form.get('smth2')
  }
  get smth3() {
    return this.form.get('smth3')
  }

  conVal = function (value: number, tarif: number) {
    return value * tarif
  }


  submit() {
    console.log('this.form.value', this.form.value)
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    this.form.reset()
    this.submitted = false

  }


}
