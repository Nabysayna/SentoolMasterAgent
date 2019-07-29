import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AuthenticationServiceService } from '../service/authentication-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login:string;
    password:string;
    smsCode:string;
    phases:boolean=false;
    data ={login:"",pwd:"",tokentemporaire:''}
    constructor(private router: Router,private _authService:AuthenticationServiceService) {}

    ngOnInit() {
        //this._authService.loggout();
    }
    onLoginPhaseTwo(){
        this.data.tokentemporaire = this.smsCode+"#"+sessionStorage.getItem('headToken');
        console.log(this.data.tokentemporaire);
        
        this._authService.authentificationPhaseTwo(this.data).then(res =>{
            console.log(res.reponse==true);
            if(res.reponse==true){
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
            }else{
                alert("sms code un incorrecte !!!")
            }
            
        })
    }
    onLoginPhaseOne() {
        console.log(this.login+" "+this.password);
        
       this.data.login = this.login;
        this.data.pwd = this.password;
        
        this._authService.login(this.data).then(res => {
            console.log(res);
            if(res != 'false'){
                this.phases = true;
            }else{
                alert("Login ou mots de pass un correct !!");
            }
        })
        //localStorage.setItem('isLoggedin', 'true');
        //this.router.navigate(['/dashboard']);
    }
}
