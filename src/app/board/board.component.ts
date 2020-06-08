import { Component, OnInit, Input } from '@angular/core';
import { BoardcrudService } from '../services/boardcrud.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Task } from '../models/board.model';

import { NbDialogService } from '@nebular/theme';
import { AddtaskDialogComponent } from '../dialogs/addtask-dialog/addtask-dialog.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  @Input() board: any;

  constructor(private boardService: BoardcrudService, private dialogService: NbDialogService) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  ngOnInit(): void {
  }

  openDialog(task?: Task, idx?: number): void {

    const newTask = { label: 'purple' };
    
    const dialogRef = this.dialogService.open( AddtaskDialogComponent, {
      context: {
        data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
      },
     
    })
    .onClose.subscribe( dialogData => {
      if (dialogData && dialogData.task.description) {
        if (dialogData.isNew) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            dialogData.task
          ]);

        }else {
          const update = this.board.tasks;
          update.splice(dialogData.idx, 1, dialogData.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }

      }
    });

   }
  
  handleDelete(){
    this.boardService.deleteBoard(this.board.id);
  }


}
