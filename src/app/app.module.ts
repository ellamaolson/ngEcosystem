import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { AboutComponent } from './about/about.component';
import { ResultOverlayComponent } from './result-overlay/result-overlay.component';
import { NewSubmissionComponent } from './new-submission/new-submission.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { SubmissionComponent } from './submission/submission.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchBarComponent,
    ResultsListComponent,
    GlossaryComponent,
    AboutComponent,
    ResultOverlayComponent,
    NewSubmissionComponent,
    AdminConsoleComponent,
    SubmissionComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: SearchBarComponent },
      { path: 'results/:searchTerm', component: ResultsListComponent },
      { path: 'glossary', component: GlossaryComponent },
      { path: 'about', component: AboutComponent },
      { path: 'result-overlay', component: ResultOverlayComponent },
      { path: 'new-submission', component: NewSubmissionComponent },
      {
        path: 'admin-console',
        component: AdminConsoleComponent,
        children: [{ path: ':id', component: SubmissionComponent }],
      },
    ]),
  ],
  providers: [AngularFirestoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
