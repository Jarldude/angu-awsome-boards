import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

import { NbDialogService } from '@nebular/theme';
import { AddboardDialogComponent } from '../dialogs/addboard-dialog/addboard-dialog.component';

import { BoardcrudService } from '../services/boardcrud.service';
import { Board } from '../models/board.model';


@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.scss']
})


export class MyBoardsComponent implements OnInit, OnDestroy {

  boards: Board[];
  sub: Subscription;

  constructor(public boardService: BoardcrudService, private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.sub = this.boardService
      .getUserBoards()
      .subscribe(boards => (this.boards = boards));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialogService.open(AddboardDialogComponent)
    .onClose.subscribe( name => {
      if (name) {
        this.boardService.createBoard({
          title: name,
          priority: this.boards.length
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
