import { Component } from '@angular/core';
import { Technology } from './technology';

const TECHNOLOGIES: Technology[] = [
    { id: 'ts101', name: 'OS X', version: '10.11', stage: 'Standard' },
    { id: 'ts102', name: 'Windows', version: '10', stage: 'Standard' },
    { id: 'ts103', name: 'Touch HW', version: 'x', stage: 'Standard' },
    { id: 'ts104', name: 'Local Hypervisor', version: 'x', stage: 'Research' },
    { id: 'ts105', name: 'Hardware RFP', version: 'x', stage: 'Research' },
    { id: 'ts106', name: 'Lenovo', version: 'x', stage: 'Retired' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Technology Roadmap - Technology Listing';
  technologies = TECHNOLOGIES;
  selectedTechnology: Technology;

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
