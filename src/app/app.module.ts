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

/*  Notes on AppModule providers:
We removed the TechnologyService from the providers array of TechnologiesComponent and added it to the providers array of AppModule.

That move created a singleton TechnologyService instance, available to all components of the application. Angular will inject 
TechnologyService and we'll use it in the DashboardComponent and anywhere else in the app we need it.

We recommend registering application-wide services in the root AppModule providers.

// Register for HTTP services
Our app will depend upon the Angular http service which itself depends upon other supporting services. The HttpModule from @angular/http 
library holds providers for a complete set of HTTP services.

We should be able to access these services from anywhere in the application. So we register them all by adding HttpModule to the 
imports list of the AppModule where we bootstrap the application and its root AppComponent.
*/
