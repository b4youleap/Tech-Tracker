import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private technologyService: TechnologyService) {

    }

  ngOnInit(): void {
    this.getTechnologies();
  }

  getTechnologies(): void {
    this.technologyService.getTechnologies().then(technologies => this.technologies = technologies);
  }

  onSelect(technology: Technology): void {
    this.selectedTechnology = technology;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTechnology.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.technologyService.create(name)
      .then(technology => {
        this.technologies.push(technology);
        this.selectedTechnology = null;
      });
  }

  delete(technology: Technology): void {
    this.technologyService
      .delete(technology.id)
      .then(() => {
        this.technologies = this.technologies.filter(t => t !== technology);
        if (this.selectedTechnology === technology) { this.selectedTechnology = null; }
      });
  }
}
