import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}
  openConfirmationDialog(message: string, className?: string) {
    console.log('class :', className);

    const dialogRef: any = this.dialog.open(DialogComponent, {
      data: {
        header: 'Confirmation',
        content: message,
        actionType: 'confirmation',
        class: className,
      },
      autoFocus: true,
      panelClass: className,
    });
    return dialogRef;
  }
}
