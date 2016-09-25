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

/*  Notes on the Constructor:
The constructor is for simple initializations like wiring constructor parameters to properties. It's not for heavy lifting. 
We should be able to create a component in a test and not worry that it might do real work — like calling a server! — before 
we tell it to do so.

If not the constructor, something has to call getTechnologies.

Angular will call it if we implement the Angular ngOnInit Lifecycle Hook. Angular offers a number of interfaces for tapping 
into critical moments in the component lifecycle: at creation, after each change, and at its eventual destruction.

Each interface has a single method. When the component implements that method, Angular calls it at the appropriate time.

    The logic of the delete handler is a bit trickier:
Of course, we delegate technology deletion to the technology service, but the component is still responsible for updating the 
display: it removes the deleted technology from the array and resets the selected technology if necessary.
*/