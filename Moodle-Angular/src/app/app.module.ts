import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { PostComponent } from './components/post/post.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    ParticipantsComponent,
    LoginPageComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
