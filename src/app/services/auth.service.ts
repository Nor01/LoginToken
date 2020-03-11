import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response'
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  AUTH_SERVER: string='http://localhost:3000';
  authSubject=new BehaviorSubject(false);

  private token:string;

  constructor(private httpClient: HttpClient) { }


//metodos REgistrar y Login

register(user: UserI):Observable<JwtResponseI>{
  return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
  user).pipe(tap(
    (res:JwtResponseI)=>{
      if(res){
        //Guardar Token
        this.saveToken(res.dataUser.accessToken,res.dataUser.expiredIn);
      }
    }
  )
  );
}//End register method


login(user: UserI):Observable<JwtResponseI>{
  return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/login`,
  user).pipe(tap(
    (res:JwtResponseI)=>{
      if(res){
        //Guardar Token

        this.saveToken(res.dataUser.accessToken,res.dataUser.expiredIn);
      }
    }
  )
  );
}//end login method


logout():void{
  this.token='';
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("EXPIRES_IN");
}//End logout method


private saveToken (token: string, expiresIn:string):void{
  localStorage.setItem("ACCESS_TOKEN",token);
  localStorage.setItem("EXPIRES_IN",expiresIn);
  this.token=token;
}//End private method savetoken

private getToken():string{
  if(!this.token){
    this.token=localStorage.getItem("ACCESS_TOKEN");
  }
  return this.token;
}//End Private method getToken


}
