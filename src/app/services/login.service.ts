import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private httpClient:HttpClient) { }

  //generamos token
  public generateToken(loginData: any){
    return this.httpClient.post(`http://localhost:8080/generate-token`,loginData);
  }

  //iniciamos sesion y establecemos el token en el localstorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
  }

  public isLoggedIn(): boolean{
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //Cerramos sesion y eliminamos el token del localStorage
  public logout():boolean{
    localStorage.clear();
    return true;
  }

  //obtenemos el token
  public getToken():any{
    return localStorage.getItem('token');
  }

  public setUser(user:any):void{
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }
     this.logout();
     return null;
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.httpClient.get(`http://localhost:8080/actual-usuario`);
  }
}
