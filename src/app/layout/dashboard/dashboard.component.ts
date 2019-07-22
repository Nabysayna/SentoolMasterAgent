import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

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

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor() {
        this.places = [
            {
                imgSrc: 'assets/images/om.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/tc.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/emo.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/wiz.png',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/kk.png',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/pc.png',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/zp.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/wy.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/tnt.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/cp.png',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/ti.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/slc.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/sde.jpg',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            },
            {
                imgSrc: 'assets/images/rpd.png',
                place: '---',
                description:
                    // tslint:disable-next-line:max-line-length
                    '.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {}
}
