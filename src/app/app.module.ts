import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { AboutComponent } from './about/about.component';
import { NewSubmissionComponent } from './new-submission/new-submission.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { SubmissionComponent } from './submission/submission.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubmissionStatusComponent } from './submission-status/submission-status.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SearchBarComponent,
    ResultsListComponent,
    GlossaryComponent,
    AboutComponent,
    NewSubmissionComponent,
    AdminConsoleComponent,
    SubmissionComponent,
    SubmissionStatusComponent,
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
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchBarComponent },
      { path: 'results', component: ResultsListComponent },
      { path: 'results/:searchTerm', component: ResultsListComponent },
      { path: 'glossary', component: GlossaryComponent },
      { path: 'about', component: AboutComponent },
      { path: 'new-submission', component: NewSubmissionComponent },
      { path: 'submission-status', component: SubmissionStatusComponent },
      { path: 'submission-status/:status-id', component: SubmissionStatusComponent },
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
