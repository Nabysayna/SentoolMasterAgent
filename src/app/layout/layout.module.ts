import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatSortModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
    MatSnackBar,
    MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { Screen2Component } from './screen2/screen2.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CreateCompteComponent } from './create-compte/create-compte.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { AuthService } from '../service/auth.service';
import { MasterServiceService } from '../service/master-service.service';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTableModule,
        FlexLayoutModule,
        MatGridListModule,
        MatSortModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        ModalModule.forRoot(),
        TranslateModule,
    ],
    providers: [
        MasterServiceService,
        AuthService,
        AuthenticationServiceService,
        MatSnackBar,
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS_FACTORY, useValue: {duration: 2500}}
    ],
    exports: [
        MatSortModule,],
    declarations: [Screen2Component, LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, CreateCompteComponent, ]

})
export class LayoutModule { }
