import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  technologies: Technology[] = [];

  constructor(
    private router: Router,
    private technologyService: TechnologyService) {
      
    }

  ngOnInit(): void {
    this.technologyService.getTechnologies()
      .then(technologies => this.technologies = technologies.slice(1, 5));
  }

  gotoDetail(technology: Technology): void {
    let link = ['/detail', technology.id];
    this.router.navigate(link);
  }
}

