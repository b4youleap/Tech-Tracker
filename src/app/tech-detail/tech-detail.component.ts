import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Technology } from '../technology';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-tech-detail',
  templateUrl: './tech-detail.component.html',
  styleUrls: ['./tech-detail.component.css']
})

export class TechDetailComponent implements OnInit {
  technology: Technology;

  constructor(
    private technologyService: TechnologyService, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params:Params) => {
      let id = +params['id'];
      this.technologyService.getTechnology(id)
        .then(technology => this.technology = technology);
    });
  }

  goBack(): void {
    window.history.back();
    /*
    Going back too far could take us out of the application. That's acceptable in a demo. We'd guard against it in a real application, perhaps with the CanDeactivate guard. 
    */
  }

}
