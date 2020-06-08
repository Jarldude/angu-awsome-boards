import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


import { switchMap, map } from 'rxjs/operators';
import { Board, Task } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardcrudService {

  constructor( private afAuth:AngularFireAuth, private db: AngularFirestore ) { }

  async createBoard(data: Board) {
      const user = await this.afAuth.currentUser; 
      return this.db.collection('boards').add({
        ...data,
        uid: user.uid,
        tasks:[{ description: 'Add something', label: 'yellow'}]
      })
  }

  deleteBoard(boardId: string){
    return this.db
    .collection('boards')
    .doc(boardId)
    .delete();
  }
  
  updateTasks(boardId: string, tasks: Task[]){
    return this.db
    .collection('boards')
    .doc(boardId)
    .update({ tasks });
  }

  removeTask(boardId: string, task: Task){
    return this.db
    .collection('boards')
    .doc(boardId)
    .update({ 
      tasks: firebase.firestore.FieldValue.arrayRemove(task)
     });
  }

  getUserBoards(){
    return this.afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          return this.db
          .collection<Board>('boards', ref => ref.where('uid', '==', user.uid).orderBy('priority'))
          .valueChanges({idField: 'id'});
        } else{
          return [];
        }
      })
    );
  }

  sortBoards(boards: Board[]){
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx)=> batch.update(ref, { priority: idx }));
    batch.commit();
  }




}
