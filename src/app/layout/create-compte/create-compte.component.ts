import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MasterServiceService } from 'src/app/service/master-service.service';

@Component({
  selector: 'app-create-compte',
  templateUrl: './create-compte.component.html',
  styleUrls: ['./create-compte.component.scss']
})
export class CreateCompteComponent implements OnInit {

  codeCreation:any;
  prenom:any;
  nom:any;
  email:any;
  tel:any;
  adresse:any;
  region:any;
  response:number = 0;
  loading:boolean;
  constructor(private _authService:AuthenticationServiceService,private _serviceMaster: MasterServiceService) { }
  
  creerpoint(){
    this.loading =  true;
    this.response = 0;
    let paramInscrpt = {'token': '234576TVG5@u_45RRFT', 'prenom':this.prenom, 'nom':this.nom, 'email':this.email, 'telephone':this.tel+"#"+this.codeCreation, 'nometps':"-", 'nomshop':"-", adresse : JSON.stringify({'region':this.region, 'zone':"-", 'souszone':"-", 'address':this.adresse}), 'idcommercial':3 };
    console.log(paramInscrpt);
    this._authService.inscription(paramInscrpt).then(res=>{
      console.log(res);
      if(res=="n-a" || res=="bad"){
        this._serviceMaster.affectation(this.codeCreation).then(res =>{
          console.log(res);
          
        })
        this.response = -1;
        this.loading =  false;
      }
     
      if(res=="ok"){
        this._serviceMaster.affectation(this.codeCreation).then(res =>{
          console.log(res);
          
        })
        this.response = 1;
        this.loading =  false;
      }
      
    })
    
  }
 
  ngOnInit() {
    this.response = 0;
  }

}
