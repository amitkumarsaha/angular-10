import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {

  constructor(
      @Inject(MAT_SNACK_BAR_DATA) public data: any, 
      public snackBarRef: MatSnackBarRef<NotifierComponent> 
      ) { }

  ngOnInit(): void {
  }

  get getIcon() {
    switch (this.data.messageType) {
      case 'success':
        return 'notification_important';
      case 'error':
        return 'error';
      case 'warn':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'notification_important';
    }
  }

}
