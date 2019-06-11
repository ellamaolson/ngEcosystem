import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { GlossaryComponent } from './glossary/glossary.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchBarComponent,
    ResultsListComponent,
    ResultDetailsComponent,
    GlossaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', component: SearchBarComponent },
      { path: 'results', component: ResultsListComponent },
      { path: 'glossary', component: GlossaryComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
