import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../service/authentication-service.service';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    providers: [
        AuthenticationServiceService,
    ],
    declarations: [LoginComponent]
})
export class LoginModule {}
