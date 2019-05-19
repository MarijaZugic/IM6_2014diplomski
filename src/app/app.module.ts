import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {enableProdMode} from '@angular/core';

import {MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatExpansionModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatPaginatorModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountryComponent } from './components/country/country.component';
import { EventComponent } from './components/event/event.component';
import { FieldComponent } from './components/field/field.component';
import { LocalgroupComponent } from './components/localgroup/localgroup.component';
import { MemberComponent } from './components/member/member.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule } from '@angular/forms';
import { CountryService } from './services/country.service';
import { EventService } from './services/event.service';

import { MemberDialogComponent } from './dialogs/member-dialog/member-dialog.component';
import { FieldDialogComponent } from './dialogs/field-dialog/field-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { FieldService } from './services/field.service';
import { LocalgroupService } from './services/localgroup.service';
import { MemberService } from './services/member.service';
import { TaskService } from './services/task.service';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { AuthorComponent } from './core/author/author.component';
import { EventDialogComponent } from './dialogs/event-dialog/event-dialog.component';


const Routes = [
  {path: 'localgroup', component: LocalgroupComponent},
  { path: 'author', component:AuthorComponent },
  { path: 'about', component:AboutComponent },
  { path: 'home' , component: HomeComponent},
  { path: 'field', component: FieldComponent },
  { path : 'member', component : MemberComponent},
  { path : 'event', component : EventComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    EventComponent,
    FieldComponent,
    LocalgroupComponent,
    MemberComponent,
    TaskComponent,
    EventDialogComponent,
    MemberDialogComponent,
    FieldDialogComponent,
    TaskDialogComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatSidenavModule, MatListModule,
    MatGridListModule, MatExpansionModule, MatSortModule,
    MatTableModule,
    MatToolbarModule, MatSelectModule, MatOptionModule,
    MatSnackBarModule, MatDialogModule, MatInputModule,
    MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, // Vežbe 10 moduli
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    MatSidenavModule
  ],
   // exports : [
    //  BrowserModule, MatDialogModule, MatIconModule
  //  ],
 
  entryComponents : [EventDialogComponent, FieldDialogComponent, MemberDialogComponent, TaskDialogComponent],
  providers: [EventService, FieldService, MemberService, TaskService , LocalgroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
