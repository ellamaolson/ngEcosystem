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
import { AboutComponent } from './about/about.component';
import { ResultOverlayComponent } from './result-overlay/result-overlay.component';
import { NewSubmissionComponent } from './new-submission/new-submission.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { SubmissionsListComponent } from './submissions-list/submissions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchBarComponent,
    ResultsListComponent,
    ResultDetailsComponent,
    GlossaryComponent,
    AboutComponent,
    ResultOverlayComponent,
    NewSubmissionComponent,
    AdminConsoleComponent,
    SubmissionsListComponent
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
      { path: 'glossary', component: GlossaryComponent},
      { path: 'about', component: AboutComponent},
      { path: 'result-overlay', component: ResultOverlayComponent},
      { path: 'new-submission', component: NewSubmissionComponent},
      { path: 'admin-console', component: AdminConsoleComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
