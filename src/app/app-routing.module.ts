import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OwnerComponent } from './edit/owner/owner.component';
import { AddAnimalComponent } from './edit/owner/add-animal/add-animal.component';
import { PetResolverServiceService } from './services/PetService/Resolver/pet-resolver-service.service';
import { AuthorizationGuard } from './Guards/authorization.guard';
import { NotfoundComponent } from './components/notfound/notfound.component';
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
