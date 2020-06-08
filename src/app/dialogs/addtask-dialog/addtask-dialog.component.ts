import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { BoardcrudService } from '../../services/boardcrud.service'

@Component({
  selector: 'app-addtask-dialog',
  template: `

    <nb-card>
      
    <nb-card-header>Task</nb-card-header>
 
    <nb-card-body >
      <textarea nbInput
                fullWidth
                placeholder="task description"
                [(ngModel)]="data.task.description">
      </textarea>
      <hr>

      <button nbButton 
              ghost 
              *ngFor="let opt of labelOptions" 
              [value]="opt" 
              size="medium"
              shape="round">

            <nb-icon 
              icon="color-palette"
              [ngClass]="opt"
              (click)="setColor(opt)">{{opt === 'gray' ? 'check_circle' : 'lens'}}</nb-icon>
      </button>

     </nb-card-body>

     <nb-card-footer class="nb-card-footer-custom">

        <button nbButton (click)="closeDialog()" ghost status="warning">
            {{ data.isNew ? 'Add Task ' : 'Update Task' }} 
        </button>

        

        <button nbButton *ngIf="!data.isNew" (click)="handleTaskDelete()" outline status="danger">
            <nb-icon icon="trash"></nb-icon>
        </button>

     </nb-card-footer>

   

    </nb-card>
  `
  ,
  styles: [`
  .content {
    overflow: hidden;
    height: auto;
    padding: 20px;
    width: 100%;
}

    mat-form-field {
        width: 100%;
      }

    textarea { display: block; width: 100%; }
    .blue { color: #71deff; }
    .green { color: #36e9b6; }
    .yellow { color: #ffcf44; }
    .purple { color: #b15cff; }
    .gray { color: gray; }
    .red { color: #e74a4a; }

    hr{
      opacity:0.3;
    }
    .nb-card-footer-custom{
      display:flex;
      justify-content:space-between;
    }
  `]
})
export class AddtaskDialogComponent {

  labelOptions = ['blue', 'green', 'yellow', 'purple', 'red', 'gray'];
  data: any;
 

  constructor( public dialogRef:NbDialogRef<AddtaskDialogComponent>, private boardService: BoardcrudService ) {
  }

  setColor(opt:string){
    this.data.task.label = opt;
  }
  closeDialog(): void{
    this.dialogRef.close(this.data);
  }
  handleTaskDelete() {

    this.boardService.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }

}
