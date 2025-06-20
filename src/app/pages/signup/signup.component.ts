import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from "../../components/primary-input/primary-input.component";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-signup',
  imports: [
    // MatCardContent,
    // MatCardModule,
    // MatCardTitle,
    // MatFormFieldModule,
    // MatLabel,
    // MatError,
    // MatInputModule,
    // MatButtonModule,
    // MatCardActions,
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
export class SignupComponent {
  // implements OnInit
  // formLogin: FormGroup;

  // constructor(private formBuilder: FormBuilder,
  //             private userService: UserService,
  //             private snackBar: MatSnackBar
  // ) {}

  // ngOnInit(): void {
  //   this.criarForm();
  // }

  // criarForm(): void {
  //   this.formLogin = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['',[Validators.required]]
  //   })
  // }

  // logar(): void {
  //   if(this.formLogin.invalid) return;

  //   var user = this.formLogin.getRawValue() as User;
  //   this.userService.logar(user).subscribe((response) => {
  //     if(!response.sucesso){
  //       this.snackBar.open('Falha na autenticação', 'Ususário ou senha incorretos', {
  //         duration: 3000
  //       });
  //     }
  //   })
  // }

  signupForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ){
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }

  submit(){
    this.loginService.login(this.signupForm.value.email,
      this.signupForm.value.password
    ).subscribe({
      next: () => console.log('sucesso'),
      error: () => {
        console.error('error');
        this.snackBar.open('Falha na autenticação', 'Ususário ou senha incorretos', {
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
