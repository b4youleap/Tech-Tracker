import { Component, OnInit } from '@angular/core';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css'],
  providers: []
})
export class TechnologiesComponent implements OnInit {
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
