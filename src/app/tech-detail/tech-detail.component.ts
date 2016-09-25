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
    /*
    Inside the ngOnInit lifecycle hook, we use the params 
    observable to extract the id parameter value from the 
    ActivatedRoute service and use the TechnologyService 
    to fetch the technology with that id.

    Notice how we extract the id by calling the forEach method 
    which will deliver our array of route parameters.

    The technology id is a number. Route parameters are always strings. 
    So we convert the route parameter value to a number with the JavaScript (+) operator.
    */
  }

  goBack(): void {
    window.history.back();
    /*
    Going back too far could take us out of the application. 
    That's acceptable in a demo. We'd guard against it in a 
    real application, perhaps with the CanDeactivate guard. 
    */
  }

  save(): void {
    this.technologyService.update(this.technology)
      .then(this.goBack);
  }

}
