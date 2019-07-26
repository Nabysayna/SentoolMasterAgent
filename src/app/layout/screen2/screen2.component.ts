import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';


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
  selector: 'app-screen2',
  templateUrl: './screen2.component.html',
  styleUrls: ['./screen2.component.scss']
})
export class Screen2Component implements OnInit {

    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

	constructor() { }
    @ViewChild(MatSort) sort: MatSort;
	ngOnInit() {
        this.dataSource.sort = this.sort;
	}

}
