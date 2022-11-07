import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:String = 'http://localhost:8080';

  constructor(private httpClient:HttpClient) { }

  public añadirUsuario(user:any){
    return this.httpClient.post<any>(`http://localhost:8080/usuarios/`,user);
  }
}
