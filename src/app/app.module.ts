import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormatPipe } from 'src/pipes/format.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserComponent } from './users/user/user.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    FormatPipe,
    UserComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, NgbModule, NoopAnimationsModule, MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
