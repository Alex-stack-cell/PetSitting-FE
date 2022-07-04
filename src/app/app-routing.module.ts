import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OwnerComponent } from './components/edit/owner/owner.component';
import { AddAnimalComponent } from './components/edit/owner/add-animal/add-animal.component';
import { PetResolverServiceService } from './services/PetService/Resolver/pet-resolver-service.service';
import { AuthorizationGuard } from './Guards/authorization.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PetSitterComponent } from './components/edit/pet-sitter/pet-sitter.component';
import { PasswordComponent } from './components/edit/password/password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    resolve: { pets: PetResolverServiceService },
  },
  {
    path: 'edit/owner',
    component: OwnerComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'edit/owner/addAnimal',
    component: AddAnimalComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'edit/petsitter',
    component: PetSitterComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'edit/password',
    component: PasswordComponent,
    canActivate: [AuthorizationGuard],
  },
  { path: '404', component: NotfoundComponent },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
