import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component'; // Import the FormComponent
import { PageadminComponent } from './pages/page-admin/page-admin.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { RoleGuard } from './guards/role.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ChoixUeComponent } from './pages/choix-ue/choix-ue.component';


// Definition des routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Route pour login page
  { path: 'login', component: LoginPageComponent },
  // Route pour register Form
  { path: 'register', component: RegisterPageComponent },
  // Route pour l'espace admin
  { path: 'espace-admin', component: PageadminComponent , canActivate: [RoleGuard], data: { expectedRoles: ['Admin']}},
  { path: 'mes-cours', component: ChoixUeComponent , canActivate: [RoleGuard], data: { expectedRoles: ['Etudiant', 'Enseignant', 'Admin']}},
  { path: 'profile' , component :ProfilePageComponent },
  { path: 'mes-cours/:id', component: ContenuUeComponent },

];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
