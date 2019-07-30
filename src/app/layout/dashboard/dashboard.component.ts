import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { MasterServiceService } from 'src/app/service/master-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { template } from '@angular/core/src/render3';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    dateDebut;
    dateFin;
    nombreTransaction:number=0;
    cashin:number=0;
    cashout:number=0;
    commission:number=0;
     nbrTransOm:number = 0;
     montantTransOm:number = 0;
     commissionTransOm:number = 0;
    
     operation:any;

     nbrTransEM:number = 0;
     montantTransEM:number = 0;
     commissionTransEM:number = 0;
    
     nbrTransWZ:number = 0;
     montantTransWZ:number = 0;
     commissionTransWZ:number = 0;
    
     nbrTransTNT:number = 0;
     montantTransTNT:number = 0;
     commissionTransTNT:number = 0;
    
     nbrTransCA:number = 0;
     montantTransCA:number = 0;
     commissionTransCA:number = 0;
    
     nbrTransPC:number = 0;
     montantTransPC:number = 0;
     commissionTransPC:number = 0;
    
     nbrTransFT:number = 0;
     montantTransFT:number = 0;
     commissionTransFT:number = 0;

     nbrTransTC:number = 0;
     montantTransTC:number = 0;
     commissionTransTC:number = 0;
  

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
   
    constructor(private _masterService:MasterServiceService,private modalService: BsModalService) {

    }
    modalRef: BsModalRef;
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
      }
    rechercher(){
        this._masterService.listeOperation(this.dateDebut,this.dateFin).then(res =>{
            this.operation = res['operations'];
            //console.log(operation);
            this.nombreTransaction = this.operation.length;
            
            for(let i of this.operation){
                this.commission = this.commission+ parseInt(i.commissionpdv);
               // console.log(i.libelleoperation.indexOf("retrait"));
                
                if(i.libelleoperation.startsWith("retrait") == true || i.libelleoperation.startsWith("transfert") == true){
                    this.cashout = this.cashout +1;  
                }else{
                    this.cashin = this.cashin + 1;
                }
                this.getInfo(i.nomservice,i);
               
                
            }     
                 
        });
    }
    getInfo(service,i){
        if(service == "orangeMoney"){
            this.nbrTransOm ++;
            this.montantTransOm = this.montantTransOm + parseInt(i.montant);
            this.commissionTransOm = this.commissionTransOm + parseInt(i.commissionpdv);
            let om = this.places.find(place => place.imgSrc == 'assets/images/om.jpg');
            om.nbrTransaction = this.nbrTransOm;
            om.montant = this.montantTransOm;
            om.commission = this.commissionTransOm;
            om.service = service;
        }
        if(service == "tiogCash"){
            this.nbrTransTC ++;
            this. montantTransTC = this.montantTransTC + parseInt(i.montant);
            this.commissionTransTC = this.commissionTransTC + parseInt(i.commissionpdv);
            let tc = this.places.find(place => place.imgSrc == 'assets/images/tc.jpg');
            tc.nbrTransaction = this.nbrTransTC;
            tc.montant = this.montantTransTC;
            tc.commission = this.commissionTransTC;
            tc.service = service;
        }
        if(service == "Emoney"){
            this.nbrTransEM ++;
            this.montantTransEM = this.montantTransTC + parseInt(i.montant);
            this.commissionTransEM = this.commissionTransTC + parseInt(i.commissionpdv);
            let em = this.places.find(place => place.imgSrc == 'assets/images/emo.jpg');
            em.nbrTransaction = this.nbrTransEM;
            em.montant = this.montantTransEM;
            em.commission = this.commissionTransEM;
            em.service = service;
        }
        if(service == "wizall"){
            this.nbrTransWZ ++;
            this.montantTransWZ = this.montantTransWZ + parseInt(i.montant);
            this.commissionTransWZ = this.commissionTransWZ + parseInt(i.commissionpdv);
            let wiz = this.places.find(place => place.imgSrc == 'assets/images/wiz.png');
           // console.log(wiz);  
            wiz.nbrTransaction = this.nbrTransWZ;
            wiz.montant = this.montantTransWZ;
            wiz.commission = this.commissionTransWZ;
            wiz.service = service;
        }
        if(service == "canal"){
            this.nbrTransCA ++;
            this.montantTransCA = this.montantTransCA + parseInt(i.montant);
            this.commissionTransCA = this.commissionTransCA + parseInt(i.commissionpdv);
            let ca = this.places.find(place => place.imgSrc == 'assets/images/cp.png');
           // console.log(wiz);  
            ca.nbrTransaction = this.nbrTransCA;
            ca.montant = this.montantTransCA;
            ca.commission = this.commissionTransCA;
            ca.service = service;
        }
        if(service == "tnt"){
            this.nbrTransTNT ++;
            this.montantTransTNT = this.montantTransTNT + parseInt(i.montant);
            this.commissionTransTNT = this.commissionTransTNT + parseInt(i.commissionpdv);
            let tnt = this.places.find(place => place.imgSrc == 'assets/images/tnt.jpg');
           // console.log(wiz);  
           tnt.nbrTransaction = this.nbrTransTNT;
           tnt.montant = this.montantTransTNT;
           tnt.commission = this.commissionTransTNT;
           tnt.service = service;
        }
    }
    listeDetail:any;
    nombreDetail:number=0;
    detailService(i){
        this.listeDetail =[];
        let serv =this.places[i].service;
        console.log(serv);
        for(let i of this.operation){
            if(i.nomservice == serv){
                this.listeDetail.push(i);
            }
        }
        this.nombreDetail = this.listeDetail.length;
        console.log(this.listeDetail);
        
    }
    ngOnInit() {
        this.dateDebut = ((new Date()).toJSON()).split("T",2)[0];
        this.dateFin = ((new Date()).toJSON()).split("T",2)[0];
        this._masterService.listeOperation(this.dateDebut,this.dateFin).then(res =>{
            this.operation = res['operations'];
            //console.log(operation);
            this.nombreTransaction = this.operation.length;
            
            for(let i of this.operation){
                this.commission = this.commission+ parseInt(i.commissionpdv);
               // console.log(i.libelleoperation.indexOf("retrait"));
                
                if(i.libelleoperation.startsWith("retrait") == true || i.libelleoperation.startsWith("transfert") == true){
                    this.cashout = this.cashout +1;  
                }else{
                    this.cashin = this.cashin + 1;
                }
                this.getInfo(i.nomservice,i);
               
                
            }     
                 
        });
        this.places = [
            {
                imgSrc: 'assets/images/om.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/tc.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/emo.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/wiz.png',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/kk.png',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/pc.png',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/zp.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/wy.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/tnt.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0
            },
            {
                imgSrc: 'assets/images/cp.png',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            
            {
                imgSrc: 'assets/images/slc.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/sde.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/rpd.png',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            },
            {
                imgSrc: 'assets/images/ti.jpg',
                nbrTransaction:  0,
                montant: 0,
                commission: 0,
                service:""
            }
        ];
    }
}
