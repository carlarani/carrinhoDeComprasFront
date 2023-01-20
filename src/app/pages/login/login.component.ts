import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  token: string = "";
  user: string = "";
  hasError: boolean = false;


  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}
  
  loginForm = this.formBuilder.group({
    email: '',
    senha: '',
  });

  ngOnInit(): void {
    // this.validateLogin();
  }
  

    onSubmit() {
      this.authService.login(
        this.loginForm.value.email ?? '',
        this.loginForm.value.senha ?? ''
      ).subscribe({
        next: (retorno) => {
          this.authService.persistToken((retorno as any).token, (retorno as any).user);
          this.route.navigate(["/home"]);
        },
        error: (error) => {
          this.hasError = true;
        }
      } 
      )
    }
  }

