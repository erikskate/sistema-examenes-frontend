import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "username": '',
    "password": ''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  formSubmit():any{
    if(this.loginData.username.trim() === ''){
      this.snack.open("El nombre de usuario es requerido!!","Aceptar",{
        duration:3000
      });
      return;
    }

    if(this.loginData.password.trim() === ''){
      this.snack.open("La contraseña es requerida!!","Aceptar",{
        duration:3000
      });
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
      },(error:any) => {
        console.log(error);
      }
    );
  }

}
