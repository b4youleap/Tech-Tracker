import { Component, OnInit } from '@angular/core';

import { Technology } from './technology';
import { TechnologyService } from './technology.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TechnologyService]
})
export class AppComponent implements OnInit {
  title = 'Technology Roadmap - Technology Listing';
  // technologies = TECHNOLOGIES;
  technologies: Technology[];
  selectedTechnology: Technology;

  constructor(private technologyService: TechnologyService) {}

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies().then(technologies => this.technologies = technologies);
  }

  onSelect(technology: Technology): void {
    this.selectedTechnology = technology;
  }
}

/*  Conversion from 'Tour of Heroes tutorial'

- lowercase hero = technology
- lowercase heroes = technologies
- uppercase HEROES = TECHNOLOGIES
- mixedcase Hero = Technology
- mixedcase selectedHero = selectedTechnology

*/
