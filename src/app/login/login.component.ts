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
    smsCode:number;
    phases:boolean=false;
    data ={login:"",pwd:""}
    constructor(private router: Router,private _authService:AuthenticationServiceService) {}

    ngOnInit() {
        
    }

    onLoginPhaseOne() {
      /*  this.data.login = this.login;
        this.data.pwd = this.password;
        this._authService.login("HDabdoul","abdou1").then(res => {
            console.log(res);
        })*/
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate(['/dashboard']);
    }
}
