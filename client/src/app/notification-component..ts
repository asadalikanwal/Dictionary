import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from '@/services';
@Component({
  selector: 'app-notification-component',
  template: `
  <div *ngIf="message" [ngClass]="message.cssClass">{{message.text}}</div>
  `,
  styles: []
})
export class NotificationComponentComponent implements OnInit {

  private subscription: Subscription;
    message: any;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.subscription = this.notificationService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
