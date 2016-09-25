import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Technology } from './technology';

@Injectable()
export class TechnologySearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<Technology[]> {
    return this.http
                .get(`app/technologies/?name=${term}`)
                .map((t: Response) => t.json().data as Technology[]);
  }

}
