import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TechnologySearchService } from '../technology-search.service';
import { Technology } from '../technology';

@Component({
  selector: 'app-technology-search',
  templateUrl: './technology-search.component.html',
  styleUrls: ['./technology-search.component.css'],
  providers: [TechnologySearchService]
})
export class TechnologySearchComponent implements OnInit {
  technologies: Observable<Technology[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private technologySearchService: TechnologySearchService,
    private router: Router) { }

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.technologies = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.technologySearchService.search(term)
        // or the observable of empty technologies if no search term
        : Observable.of<Technology[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Technology[]>([]);
      });
  }

  gotoDetail(technology: Technology): void {
    let link = ['/detail', technology.id];
    this.router.navigate(link);
  }

}

/*  SEARCH TERMS

Let's focus on the searchTerms:
A Subject is a producer of an observable event stream; searchTerms produces an Observable of strings, the filter 
criteria for the name search.

Each call to search puts a new string into this subject's observable stream by calling next.

INITIALIZE THE TECHNOLOGIES PROPERTY (NGONINIT)

A Subject is also an Observable. We're going to turn the stream of search terms into a stream of Technology arrays 
and assign the result to the technologies property.

If we passed every user keystroke directly to the HeroSearchService, we'd unleash a storm of HTTP requests. Bad 
idea. We don't want to tax our server resources and burn through our cellular network data plan.

Fortunately, we can chain Observable operators to the string Observable that reduce the request flow. We'll make 
fewer calls to the HeroSearchService and still get timely results. Here's how:

- debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along 
  the latest string. We'll never make requests more frequently than 300ms.

- distinctUntilChanged ensures that we only send a request if the filter text changed. There's no point in 
  repeating a request for the same search term.

- switchMap calls our search service for each search term that makes it through the debounce and 
  distinctUntilChanged gauntlet. It cancels and discards previous search observables, returning only the latest 
  search service observable.

The switchMap operator (formerly known as "flatMapLatest") is very clever.

Every qualifying key event can trigger an http method call. Even with a 300ms pause between requests, we 
could have multiple HTTP requests in flight and they may not return in the order sent.

switchMap preserves the original request order while returning only the observable from the most recent 
http method call. Results from prior calls are canceled and discarded.

We also short-circuit the http method call and return an observable containing an empty array if the search 
text is empty.

Note that canceling the HeroSearchService observable won't actually abort a pending HTTP request until 
the service supports that feature, a topic for another day. We are content for now to discard unwanted results.

- catch intercepts a failed observable. Our simple example prints the error to the console; a real life application 
  should do better. Then we return an observable containing an empty array to clear the search result.

Import RxJS operators
The RxJS operators are not available in Angular's base Observable implementation. We have to extend Observable by 
importing them. We combine all of the RxJS Observable extensions that our entire app requires into a single RxJS imports file.
We load them all at once by importing rxjs-extensions at the top of AppModule.

//  Notes on Providers:
The providers array tells Angular to create a fresh instance of the TechnologyService when it creates a new 
AppComponent. The AppComponent can use that service to find technologies and so can every child component of 
its component tree.

*/
