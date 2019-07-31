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
       this.places = [];
        this._masterService.listeOperation(this.dateDebut,this.dateFin).then(res =>{
            this.operation = res['operations'];
            //console.log(operation);
            this.nombreTransaction = this.operation.length;
            
            for(let i of this.operation){
                if(i.commissionpdv != null){
                    this.commission = this.commission+ parseInt(i.commissionpdv);
                }
               // console.log(i.libelleoperation.indexOf("retrait"));
                
                if(i.libelleoperation.startsWith("retrait") == true || i.libelleoperation.startsWith("transfert") == true){
                    this.cashout = this.cashout +1;  
                }else{
                    this.cashin = this.cashin + 1;
                }
                this.getInfo(i.nomservice,i);
               
                
            }     
                 
        });
        //console.log(this.places);
        //console.log(this.commission);
        
    }
    getInfo(service,i){
        if(!this.isFacturier(i.libelleoperation)){
            if(this.places.find(place => place.service == service)){
                let obj = this.places.find(place => place.service == service)
                obj.imgSrc = 'assets/images/'+service+'.jpg';
                obj.nbrTransaction ++;
                obj.montant =  obj.montant + parseInt(i.montant);
                if(i.commissionpdv != null){
                    obj.commission = obj.commission + parseInt(i.commissionpdv);
                }else{
                    obj.commission = obj.commission + 0;
                }
                obj.service = service;
    
            }else{
                let newObj = {
                    imgSrc: 'assets/images/'+service+'.jpg',
                    nbrTransaction:  0,
                    montant: 0,
                    commission: 0,
                    service:""
    
                }
                newObj.nbrTransaction ++;
                newObj.montant =  newObj.montant + parseInt(i.montant);
                if(i.commissionpdv != null){
                    newObj.commission = newObj.commission + parseInt(i.commissionpdv);
                }else{
                    newObj.commission = newObj.commission + 0;
                }
                newObj.service = service;
                this.places.push(newObj);
            }
        }else{

            if(this.places.find(place => place.service == i.libelleoperation)){
                let obj = this.places.find(place => place.service == i.libelleoperation)
                obj.imgSrc = 'assets/images/'+i.libelleoperation+'.jpg';
                obj.nbrTransaction ++;
                obj.montant =  obj.montant + parseInt(i.montant);
                if(i.commissionpdv != null){
                    obj.commission = obj.commission + parseInt(i.commissionpdv);
                }else{
                    obj.commission = obj.commission + 0;
                }
                obj.service = i.libelleoperation;
    
            }else{
                let newObj = {
                    imgSrc: 'assets/images/'+i.libelleoperation+'.jpg',
                    nbrTransaction:  0,
                    montant: 0,
                    commission: 0,
                    service:""
    
                }
                newObj.nbrTransaction ++;
                newObj.montant =  newObj.montant + parseInt(i.montant);
                if(i.commissionpdv != null){
                    newObj.commission = newObj.commission + parseInt(i.commissionpdv);
                }else{
                    newObj.commission = newObj.commission + 0;
                }
                newObj.service = i.libelleoperation;
                this.places.push(newObj);
            }
        }
        

    }
    isFacturier(libelleoperation){
        if(libelleoperation.includes('senelec') ||libelleoperation.includes('sde')  || libelleoperation.includes('woyofal') || libelleoperation.includes('rapido')){
            return true;
        }else{
            return false;
        }
    }
    listeDetail:any;
    nombreDetail:number=0;
    detailService(i){
        this.listeDetail =[];
        let serv =this.places[i].service;
        console.log(serv);
        for(let i of this.operation){
            if(!this.isFacturier(i.libelleoperation)){
                if(i.nomservice == serv){
                    this.listeDetail.push(i);
                }
            }else{
                if(i.libelleoperation == serv){
                    this.listeDetail.push(i);
                }
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
       /* this.places = [
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
        ];*/
    }
}
