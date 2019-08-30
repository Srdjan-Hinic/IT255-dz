import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth-service.service';
import { ReservationsComponent } from './components/reservations/reservations.component';

import { SizePipePipe } from './pipes/size-pipe.pipe';
import { BedPipePipe } from './pipes/bed-pipe.pipe';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ReservationsComponent,
    SizePipePipe,
    BedPipePipe,
    AddRoomComponent,
    AddRoomComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService,AuthService,AuthGuardService, AdminGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
