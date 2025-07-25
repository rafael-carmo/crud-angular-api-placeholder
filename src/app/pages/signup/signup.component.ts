import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { User } from '../../interfaces/user';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    DefaultLoginLayoutComponent,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit(){
    this.loginService.signup(
      this.signupForm.value.name,
      this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe({
      next: () => {
        console.log('sucesso');
        this.router.navigate(['/login']);
      },
      error: () => {
        console.error('error');
        this.snackBar.open('Erro inesperado!','Tente novamente mais tarde', {
          duration: 3000
        });
      }
    }

    )
  }
  navigate(){
    this.router.navigate(['/login']);
  }
}
