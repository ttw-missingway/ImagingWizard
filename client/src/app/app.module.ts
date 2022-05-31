import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { Roster } from './services/roster.service';
import CharacterListView from './views/characterListView.component';
import { RosterPage } from './pages/rosterPage.component';
import { RouterModule } from '@angular/router';
import { CharacterDetailPage } from './pages/characterDetailPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCharacterPage } from './pages/createCharacterPage.component';
import { DndDirective } from './pages/dnd.directive';
import { FiledownloaderclientComponent } from './file/filedownloaderclient/filedownloaderclient.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListView,
    RosterPage,
    CreateCharacterPage,
    CharacterDetailPage,
    DndDirective,
    FiledownloaderclientComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: RosterPage},
      { path: 'detail/:id', component: CharacterDetailPage}
    ], {
      useHash: true
    }),
  ],
  providers: [
    Roster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
