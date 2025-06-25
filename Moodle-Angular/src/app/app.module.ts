import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { PostComponent } from './components/section/post/post.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormComponent } from './components/form/form.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module'; // Import AngularFireAuthModule for authentication
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UeComponent } from './components/ue/ue.component'; // Conteneur de l'UE sur la page Mes Cours
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
import { DevoirFormComponent } from './components/section/devoir/devoir-form/devoir-form.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { DevoirSubmissionComponent } from './pages/devoir-submission/devoir-submission.component';
import { GradeDevoirComponent } from './pages/grade-devoir/grade-devoir.component';
import { CustomPostComponent } from './components/section/post/custom-post/custom-post.component';
import { CustomPostFormComponent } from './components/section/post/custom-post/custom-post-form/custom-post-form.component';
import { PageUnauthorizedComponent } from './pages/page-unauthorized/page-unauthorized.component';
import { ConnectionTableComponent } from './components/connection-table/connection-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    DiscussionsComponent,
    LoginPageComponent,
    FormComponent,
    RegisterPageComponent,
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
    DevoirFormComponent,
    ParticipantsComponent,
    DevoirSubmissionComponent,
    GradeDevoirComponent,
    CustomPostComponent,
    CustomPostFormComponent,
    PageUnauthorizedComponent,
    ConnectionTableComponent,
    FooterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],

  // JWT Components:
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
