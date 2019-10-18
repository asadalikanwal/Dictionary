import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li><a [routerLink]="['register']">Register</a></li>
      <li><a [routerLink]="['login']">Login</a></li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class AppComponent {
  constructor(){}
}
