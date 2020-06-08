import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  type: 'register' | 'login' | 'reset' = 'register';

  myForm: FormGroup;
  loading = false;
  success = false;
  serverMessage: string;
  emailValidateMsg = ' You must enter a valid email address';
  passwordValidateMsg = 'Password must be at least 6 characters long';


  constructor( public authService: AuthService, private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }



  changeActionType(val:any){
    this.type = val;
  }

  get actionType(){
    return this.type
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isRegister() {
    return this.type === 'register';
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  async onSubmit() {
  
    this.loading = true;
    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.authService.signInWithEmailAndPassword(email, password)
        this.success = true;
      }
      if (this.isRegister) {
        await this.authService.createUserWithEmailAndPassword(email, password)
        this.success = true;
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
  }

  signinWithGoogle(){
    this.authService.googleSignin();
  }
}
