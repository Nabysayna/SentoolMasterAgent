import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MasterServiceService } from 'src/app/service/master-service.service';



@Component({
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

    listeUser:any = []; 
    displayedColumns = ['telephone', 'nom', 'prenom', 'caution','option','option1'];
    dataSource:any=[];
    dateDebut:any;
    dateFin:any;
    listeDetail:any = [];
    nombreDetail:number = 0;
    id_userSave:String;
	constructor(private _masterService:MasterServiceService,private modalService: BsModalService) { 
    }
    modalRef: BsModalRef;
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
    }
    modalRef1: BsModalRef;
    openModal1(template1: TemplateRef<any>) {
        this.modalRef1 = this.modalService.show(template1,{class: 'modal-lg'});
    }
    montant:number;
    id_receiver
    deposer(id_user){
        this.id_receiver =id_user;
        //console.log(id_user);
        this.depositeError = 0;
        this.montant = undefined;
      

    }
    depositeError:number = 0;
    valider(){
        this._masterService.updateCaution(this.montant,this.id_receiver).then(res=>{
            if(res['code'] == 1){
                this.depositeError = 1;
            }else{
                this.depositeError = -1;
            }
        })
    }
    suivi(id_user){
        this.id_userSave = id_user;
        this.listeDetail =[];
        this.nombreDetail = 0;
        this.dateDebut = ((new Date()).toJSON()).split("T",2)[0];
        this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
        this._masterService.listOperationByPoint(this.dateDebut,this.dateFin,id_user).then(res =>{
            this.listeDetail = res['operations'];
            this.nombreDetail = this.listeDetail.length;
            console.log(res['operations']);


        });

    }
    rechercher(){
        this.listeDetail =[];
        this.nombreDetail = 0;
         /* this._masterService.listOperationByPoint(this.dateDebut,this.dateFin,this.id_userSave).then(res =>{
            this.listeDetail = res['operations'];
            this.nombreDetail = this.listeDetail.length;
            console.log(res['operations']);            
        });*/
        this._masterService.listedeposit(this.dateDebut,this.dateFin,this.id_userSave).then(res=>{
            //console.log(res);
            this.listeDetail = res['deposit'];
            this.nombreDetail = this.listeDetail.length;
            
        })
    }
    currencyFormat(somme) : String{
        return Number(somme).toLocaleString() ;
      }
    getInfo1(requete,nom){
        let req = JSON.parse(requete);
        if(nom == "prenom"){
          return req.prenom;
        } 
        if(nom == "nom"){
          
          return req.nom;
        }
        if(nom == "montant"){
          return req.montant ;
        }
    }
   
    @ViewChild(MatSort) sort: MatSort;
    doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    
  
	ngOnInit() {
        this._masterService.listeUser().then(res =>{
            this.listeUser = res['users'];
            this.dataSource = new MatTableDataSource(this.listeUser);
            this.dataSource.sort = this.sort;   
            console.log(res['users']); 
        })
        
        
	}

}
