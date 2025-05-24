import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component'; // Import the FormComponent
import { PageadminComponent } from './pages/page-admin/pageadmin.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';

// Define routes
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'form', component: FormComponent },
  { path: 'espace-admin', component: PageadminComponent },
  { path: 'mes-cours', component: ContenuUeComponent },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
