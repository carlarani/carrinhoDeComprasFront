import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsuarioService } from '../../service/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token: string = "";
  user: string = "";
  hasError: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {
  }

  loginForm = this.formBuilder.group({
    email: '',
    senha: '',
  });

  ngOnInit(): void {
    this.validate();
  }


  private validate() {
    let Xtoken = localStorage.getItem("Xtoken");
    console.log(Xtoken);

    this.token = (Xtoken != null) ? Xtoken : "";
    this.authService.validaLogin(this.token).subscribe({
      next: (retorno) => {
        console.log(retorno);

        this.route.navigate(["/home"]);
      },
      error: (error) => {
        if (error.status == 200)
          this.route.navigate(['/home']);

      }
    }
    );
  }

  onSubmit() {
    this.authService.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.senha ?? ''
    ).subscribe({
      next: (retorno) => {
        this.authService.persistToken((retorno as any).token, (retorno as any).user);
        this.validate();
      },
      error: (error) => {
        this.hasError = true;
        if (error.status == 404)
          alert("Usuário e/ou senha inválidos");

      }
    }
    )
  }
}

