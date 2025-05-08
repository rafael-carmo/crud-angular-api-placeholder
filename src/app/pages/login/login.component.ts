import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  imports: [
    MatCardContent,
    MatCardModule,
    MatCardTitle,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatInputModule,
    MatButtonModule,
    MatCardActions,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.criarForm();
  }

  criarForm(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  logar(): void {
    if(this.formLogin.invalid) return;

    var user = this.formLogin.getRawValue() as User;
    this.userService.logar(user).subscribe((response) => {
      if(!response.sucesso){
        this.snackBar.open('Falha na autenticação', 'Ususário ou senha incorretos', {
          duration: 3000
        });
      }
    })
  }
}
