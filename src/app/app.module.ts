import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TechDetailComponent } from './tech-detail/tech-detail.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyService } from './technology.service';
import { routing } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnologySearchComponent } from './technology-search/technology-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TechDetailComponent,
    TechnologiesComponent,
    DashboardComponent,
    TechnologySearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  providers: [
    TechnologyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
