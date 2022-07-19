import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { Roster } from './services/roster.service';
import InstrumentListView from './views/instrumentListView.component';
import { RosterPage } from './pages/rosterPage.component';
import { RouterModule } from '@angular/router';
import { InstrumentDetailPage } from './pages/instrumentDetailPage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateInstrumentPage } from './pages/createInstrumentPage.component';
import { DndDirective } from './pages/dnd.directive';
import { FiledownloaderclientComponent } from './file/filedownloaderclient/filedownloaderclient.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentListView,
    RosterPage,
    CreateInstrumentPage,
    InstrumentDetailPage,
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
      { path: 'detail/:id', component: InstrumentDetailPage}
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
