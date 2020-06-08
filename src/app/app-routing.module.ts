import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MyBoardsComponent } from './my-boards/my-boards.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  {
    path: 'login',
    component: LoginComponent,  
  },
  {
    path: 'my-boards',
    component: MyBoardsComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'user-profile',
    component: UserProfileComponent, 
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
