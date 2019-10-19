import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'login',
  template: `
    <form [formGroup]='loginForm' (onSubmit)="onSubmit()">
      <div>
        <label>Email: </label>
        <input type="email" placeholder="examle@examle.com" formControlName = 'email'>
      </div>
    </form>
  `,
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    })
  }
  onSubmit(){

  }
  ngOnInit() {
  }

}
