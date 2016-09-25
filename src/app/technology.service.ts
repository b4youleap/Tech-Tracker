import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Technology } from './technology';

@Injectable()
export class TechnologyService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private technologiesUrl = 'app/technologies'; // URL to web api

  constructor(private http: Http) { }

  // stub a method like ->  getTechnologies(): void {}
  getTechnologies(): Promise<Technology[]> {
    return this.http.get(this.technologiesUrl)
                .toPromise()
                .then(response => response.json().data as Technology[])
                .catch(this.handleError);
  }

  getTechnology(id: number): Promise<Technology> {
    return this.getTechnologies()
      .then(technologies => technologies.find(technology => technology.id === id));
  }

  update(technology: Technology): Promise<Technology> {
    const url = `${this.technologiesUrl}/${technology.id}`;
    return this.http
      .put(url, JSON.stringify(technology), {headers: this.headers})
      .toPromise()
      .then(() => technology)
      .catch(this.handleError);
  }

  create(name: string): Promise<Technology> {
    return this.http
      .post(this.technologiesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    let url = `${this.technologiesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error ocurred', error);
    return Promise.reject(error.message || error);
  }

}
