import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../../component/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(displayMessage: string, buttonText: string, messageType: 'error'|'success'){
    this.snackBar.openFromComponent( NotifierComponent , {
      data: {
        displayMessage: displayMessage,
        buttonText: buttonText,
        messageType: messageType
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType
    })
  }

}
