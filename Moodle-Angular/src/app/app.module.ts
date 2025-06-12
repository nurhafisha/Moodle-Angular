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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DevoirComponent } from './components/section/devoir/devoir.component';
import { CoursFormComponent } from './components/cours-form/cours-form.component';
import { RessourceFormComponent } from './components/ressources-form/ressource-form.component';
import { DevoirFormComponent } from './components/devoir-form/devoir-form.component';
import { DevoirSubmissionComponent } from './pages/devoir-submission/devoir-submission.component';
import { GradeDevoirComponent } from './pages/grade-devoir/grade-devoir.component';


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
    ProfilePageComponent,
    SectionComponent,
    DevoirComponent,
    CoursFormComponent,
    RessourceFormComponent,
    DevoirFormComponent,
    DevoirSubmissionComponent,
    GradeDevoirComponent
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

  // JWT Components: 
  providers: [ 
  {provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true}],

  bootstrap: [AppComponent],

})
export class AppModule {}
