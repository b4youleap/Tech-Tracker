import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TechDetailComponent } from './tech-detail/tech-detail.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { TechnologyService } from './technology.service';

@NgModule({
  declarations: [
    AppComponent,
    TechDetailComponent,
    TechnologiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TechnologyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
