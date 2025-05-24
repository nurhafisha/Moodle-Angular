import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContenuUeComponent } from './pages/contenu-ue/contenu-ue.component';
import { PostComponent } from './components/post/post.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ActualiteComponent } from './components/actualite/actualite.component';
import { UeComponent } from './components/ue/ue.component';
import { ChoixUeComponent } from './pages/choix-ue/choix-ue.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    ParticipantsComponent,
    ActualiteComponent,
    UeComponent,
    ChoixUeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
