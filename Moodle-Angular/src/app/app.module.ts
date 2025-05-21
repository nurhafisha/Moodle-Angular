import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContenuUeComponent } from './contenu-ue/contenu-ue.component';
import { PostComponent } from './contenu-ue/post/post.component';
import { ParticipantsComponent } from './contenu-ue/participants/participants.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuUeComponent,
    PostComponent,
    ParticipantsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
