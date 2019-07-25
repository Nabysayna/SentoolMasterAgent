import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MasterServiceService } from 'src/app/service/master-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
    dateUpdte: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', dateUpdte: '2019-07-12 10:30:23' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', dateUpdte: '2019-07-12 10:30:23' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', dateUpdte: '2019-07-12 10:30:23' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', dateUpdte: '2019-07-12 10:30:23' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', dateUpdte: '2019-07-12 10:30:23' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', dateUpdte: '2019-07-12 10:30:23' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', dateUpdte: '2019-07-12 10:30:23' }
];



@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {

    listeUser:any = []; 
    displayedColumns = ['position', 'name', 'weight', 'symbol','option'];
    dataSource:any;
    dateDebut:any;
    dateFin:any;
    listeDetail:any = [];
    nombreDetail:number = 0;
    id_userSave:String;
	constructor(private _masterService:MasterServiceService,private modalService: BsModalService) {}
    modalRef: BsModalRef;
    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
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
          this._masterService.listOperationByPoint(this.dateDebut,this.dateFin,this.id_userSave).then(res =>{
            this.listeDetail = res['operations'];
            this.nombreDetail = this.listeDetail.length;
            console.log(res['operations']);            
        });
    }
	ngOnInit() {
        this._masterService.listeUser().then(res =>{
            this.listeUser = res['users'];
            this.dataSource = new MatTableDataSource(this.listeUser);

            console.log(res['users']);
            
        })
	}

}
