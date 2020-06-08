import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase config files
import{ environment } from '../environments/environment'

// 1. firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//nebular
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { NbInputModule } from '@nebular/theme'
import { NbPopoverModule } from '@nebular/theme'
import { NbUserModule } from '@nebular/theme'
import { NbDialogModule } from '@nebular/theme'
import { NbSpinnerModule } from '@nebular/theme'
import { NbTooltipModule } from '@nebular/theme'




import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MyBoardsComponent } from './my-boards/my-boards.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddboardDialogComponent } from './dialogs/addboard-dialog/addboard-dialog.component';
import { BoardComponent } from './board/board.component';
import { AddtaskDialogComponent } from './dialogs/addtask-dialog/addtask-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    MyBoardsComponent,
    AddboardDialogComponent,
    BoardComponent,
    AddtaskDialogComponent,
    
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // 3. Initialize and firebase stuf
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule, NbThemeModule.forRoot({ name: 'dark' }),

    //Nebular stuff
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbPopoverModule,
    NbUserModule,
    NbDialogModule.forRoot(),
    NbSpinnerModule,
    NbTooltipModule,

    //Angular CDK stuff
    DragDropModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
