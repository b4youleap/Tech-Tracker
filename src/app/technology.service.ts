import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Technology } from './technology';

@Injectable()
export class TechnologyService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private technologiesUrl = 'app/technologies'; // URL to web api

  constructor(private http: Http) { }

  // How to stub a method:  
  // getTechnologies(): void {}
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
/*    Notes on Promises, Observables and rxjs
The Angular http.get returns an RxJS Observable. Observables are a powerful way to manage asynchronous data flows.
Unfortunately, the Angular Observable doesn't have a toPromise operator ... not out of the box. The Angular 
Observable is a bare-bones implementation.

There are scores of operators like toPromise that extend Observable with useful capabilities. If we want those 
capabilities, we have to add the operators ourselves. That's as easy as importing them from the RxJS library.

Extracting the data in the then callback
In the promise's then callback we call the json method of the HTTP Response to extract the data within the response.

That response JSON has a single data property. The data property holds the array of technologies that the caller 
really wants. So we grab that array and return it as the resolved Promise value.

IMPORTANT!!! Pay close attention to the shape of the data returned by the server. This particular in-memory web API 
example happens to return an object with a data property. Your API might return something else. Adjust the code to 
match your web API.

Error Handling
At the end of getTechnologies() we catch server failures and pass them to an error handler. This is a critical step! 
We must anticipate HTTP failures as they happen frequently for reasons beyond our control.
In this demo service we log the error to the console; we would do better in real life.

We've also decided to return a user friendly form of the error to the caller in a rejected promise so that the caller 
can display a proper error message to the user.

Observables

Each Http service method returns an Observable of HTTP Response objects.

Our TechnologyService converts that Observable into a Promise and returns the promise to the caller. In this section 
we learn to return the Observable directly and discuss when and why that might be a good thing to do.

Background
An observable is a stream of events that we can process with array-like operators.

Angular core has basic support for observables. We developers augment that support with operators and extensions from 
the RxJS Observables library. We'll see how shortly.

Recall that our TechnologyService quickly chained the toPromise operator to the Observable result of http.get. That 
operator converted the Observable into a Promise and we passed that promise back to the caller.

Converting to a promise is often a good choice. We typically ask http.get to fetch a single chunk of data. When we 
receive the data, we're done. A single result in the form of a promise is easy for the calling component to consume 
and it helps that promises are widely understood by JavaScript programmers.

But requests aren't always "one and done". We may start one request, then cancel it, and make a different request before 
the server has responded to the first request. Such a request-cancel-new-request sequence is difficult to implement with 
Promises. It's easy with Observables as we'll see.

Search-by-name
We're going to add a technology search feature to the Tech Tracker. As the user types a name into a search box, we'll make 
repeated HTTP requests for technologies filtered by that name.

The http.get() call in TechnologySearchService is similar to the one in the TechnologyService, although the URL now has a 
query string. Another notable difference: we no longer call toPromise, we simply return the observable instead.

As the user types in the search box, a keyup event binding calls the component's search method with the new search box value.

The *ngFor repeats technology objects from the component's technologies property. No surprise there. But the technologies 
property is now an Observable of technology arrays, rather than just a technology array. The *ngFor can't do anything with 
an Observable until we flow it through the async pipe (AsyncPipe). The async pipe subscribes to the Observable and produces 
the array of technologies to *ngFor.
*/
