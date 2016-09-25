import { Component, Input } from '@angular/core';
import { Technology } from '../technology';

@Component({
  selector: 'app-tech-detail',
  templateUrl: './tech-detail.component.html',
  styleUrls: ['./tech-detail.component.css']
})

export class TechDetailComponent {
  @Input()
  technology: Technology;

}
