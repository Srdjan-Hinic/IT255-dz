import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component : RegisterComponent},
  { path: "home", component : HomeComponent},
  { path: "reservations", component : ReservationsComponent, canActivate: [AuthGuardService]},
  { path: "addroom", component : AddRoomComponent, canActivate: [AdminGuardService]},
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
