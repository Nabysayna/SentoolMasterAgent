import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { HttpModule } from '@angular/http';
import { LoaderComponent } from '../loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        HttpModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    providers: [
        AuthenticationServiceService,
    ],
    declarations: [LoginComponent,LoaderComponent]
})
export class LoginModule {}
