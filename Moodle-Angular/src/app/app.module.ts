import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { PostComponent } from './components/section/post/post.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormComponent } from './components/form/form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module'; // Import AngularFireAuthModule for authentication
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ActualiteComponent } from './components/actualite/actualite.component';
import { UeComponent } from './components/ue/ue.component';
import { ChoixUeComponent } from './pages/choix-ue/choix-ue.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageadminComponent } from './pages/page-admin/page-admin.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UETableComponent } from './components/ue-table/ue-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SectionComponent } from './components/section/section.component';


@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    DiscussionsComponent,
    LoginPageComponent,
    FormComponent,
    RegisterPageComponent,
    ActualiteComponent,
    UeComponent,
    ChoixUeComponent,
    NavbarComponent,
    PageadminComponent,
    UserTableComponent,
    UETableComponent,
    SectionComponent,
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase with the environment configuration
    AngularFireAuthModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
