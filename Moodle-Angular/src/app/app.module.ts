import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { PostComponent } from './components/post/post.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormComponent } from './components/form/form.component';
import  {AngularFireModule} from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module'; // Import AngularFireAuthModule for authentication
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    ParticipantsComponent,
    LoginPageComponent,
    FormComponent,
    RegisterPageComponent
  ],

  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase with the environment configuration
    AngularFireAuthModule, 
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
