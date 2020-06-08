import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-addboard-dialog',
  template: `

    <nb-card >
      <nb-card-header>New Board <nb-icon icon="list-outline"></nb-icon></nb-card-header>
      <nb-card-body>

        <p>What shall we call this board?</p>
        <input type="text"
                 nbInput
                 fullWidth
                 status="basic"
                 placeholder="board name"
                 [(ngModel)]="value">
      </nb-card-body>

      <nb-card-footer class="nb-card-footer-custom">     
        <button nbButton status="success" ghost (click)="submit()">add <nb-icon icon="plus-outline"></nb-icon></button>
        <button nbButton status="danger" ghost (click)="closeDialog()">cancel<nb-icon icon="close-circle-outline"></nb-icon></button>
      </nb-card-footer>
      
    </nb-card>

`,
  styles: [`
   .nb-card-footer-custom {
     display:flex;
     justify-content:space-around;
   }
  `]
})
export class AddboardDialogComponent {

  value: string
  constructor(protected dialogRef:NbDialogRef<AddboardDialogComponent> ) {
  }

  closeDialog() {
    this.dialogRef.close();
  }
  submit() {
    this.dialogRef.close(this.value);
  }
 
}
