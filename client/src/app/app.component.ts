import { Component } from '@angular/core';
import { UserService } from './_service/user.service';

@Component({
    selector: 'app-root',
    template: `
    <mat-toolbar color="primary">
        <span class="app-name"><i class="material-icons">bookmark</i>
        Dictionary Application</span>

        <!-- This fills the remaining space of the current row -->
        <span class="example-fill-remaining-space"></span>
        <span *ngIf="!userService.getCurrentUser ; else elseBlock">
            <a [routerLink]="['register']" class="white-link">Register</a> |
            <a [routerLink]="['login']" class="white-link">Login</a>
        </span>
        <ng-template #elseBlock><span>Welcome to Dashboard</span></ng-template>

    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
    styles: [`
  a.white-link {color: #fff; font-size: 16px; }
  .example-fill-remaining-space {flex: 1 1 auto;}
  .app-name { display: inline-flex; vertical-align: middle; line-height: 1.2;
} `]
})
export class AppComponent {
    constructor(public userService: UserService) { }
}
