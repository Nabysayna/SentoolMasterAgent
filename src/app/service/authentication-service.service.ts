import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as sha1 from 'js-sha1';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  public baseToken: string ;
  public email: string ;
  public prenom: string ;
  public nom: string ;
  public nometps: string ;
  public telephone: string ;
  public accessLevel: number ;
  public authorizedApis: string ;

  constructor(private _authService:AuthService) {
    var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.baseToken = currentUser && currentUser.baseToken;
  }

  login(email: string, password: string): Promise<string> {
    return new Promise( (resolve, reject)=> {
      console.log("-------111-----------")
      this._authService.authentifier({login:email, pwd:sha1(password)}).then(
        response => {
          console.log(Response);
          
          if( response != 'false' ){
            sessionStorage.setItem('headToken', response.split("#")[1] );
            resolve(response);
          } else {
            resolve("rejected");
          }
        },
        error => reject("rejected"),
        
      )
    });
  }

  loginPhase2(smsCode): Promise<number> {
    return new Promise( (resolve, reject)=> {
      this._authService.authentificationPhaseTwo({tokentemporaire:smsCode}).then(
        response => {
         /* var resp:AuthResponse=JSON.parse(response);
          console.log("11------------") ;
          console.log(resp) ;
          console.log(resp.reponse) ;
          console.log(resp.reponse==true?'oui':'non')
          console.log("------------11") ;
          if(resp.reponse==true){
            this.baseToken = sessionStorage.getItem('headToken')+sha1(resp.baseToken+sha1("bay3k00_f1_n10un") );
            this.email = resp.prenom;
            this.prenom = resp.prenom;
            this.nometps = resp.nometps;
            this.nom = resp.nom;
            this.telephone = resp.telephone;
            this.accessLevel = resp.accessLevel;
            this.authorizedApis = resp.authorizedApis;

            sessionStorage.setItem('currentUser', JSON.stringify({ username: this.email, baseToken: this.baseToken, authorizedApis:this.authorizedApis, accessLevel:this.accessLevel, prenom:this.prenom, nom:this.nom, telephone:this.telephone, firstuse:resp.firstuse}));

            resolve(this.accessLevel);
          } else {
            resolve(0);

          }*/
        },
        error => reject(error),
      )
    });
  }

  logout(): void {
    this.baseToken = null;
    sessionStorage.removeItem('currentUser');
  }
}
