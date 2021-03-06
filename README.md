# Tech-Tracker
## A transformation of the Tour of Heroes Tutorial using angular-cli and applied to Technologies.

Updated for Angular 4 / Angular CLI 1.0.4 - did not implement any changes that may have occurred in the tutorial though.

This project was initially generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15 / on Node version 5.12.0 (x64) / with npm version 3.10.8
The final version maintained those tooling versions. Any further updates (like continuing with the advanced tutorials) will likely be done in a separate project.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Notes on angular-cli (9/24/2016)
 * There is an error towards the end of the install during the 'build' phase where errors are thrown for NODE-GYP and something else un-catchable as it flew by. Installing
    Visual Studio 2015 Build Tools (C++) did not help.

## Notes on working through the 'Tour of Heroes' Tutorial (except using angular-cli instead of the QuickStart steps to create the app)
This project aims to create a Technical Roadmap / R&D tracking / Technology Standards application as translated from the TOH tutorial and other advanced tutorials
found on angular.io (as of 9/24/2016).

Translations so far:

### From Introduction through Master/Detail tutorials
    * lowercase hero = technology
    * lowercase heroes = technologies
    * uppercase HEROES = TECHNOLOGIES
    * mixedcase Hero = Technology
    * mixedcase selectedHero = selectedTechnology

### From Multiple Components tutorial
    * used ng generate component tech-detail to gen all pieces needed - nicely handles making app.module aware and adds test scaffold
    * NOTE: used shortened tech-detail instead of technology-detail to = hero-detail
    * kebab-cased hero-detail.component.ts = tech-detail.component.ts
    * used element tag from ng generated code rather than my-hero-detail
    * GOTCHA - change selectedTechnology to technology in HTML - the Input decorator defines it

### From Services tutorial
    * used ng generate service technology to gen needed stuff - services are provided rather than imported so only adds test scaffold
    * NOTE: Need to circle back through tutorial and extract some good reasons WHY some code is done a certain way - tomorrow before doing the advanced tutorials

### From Routing tutorial
    * lots of relocations
    * instead of renaming gyrations I created a technologies component ng generate component technologies to = heroes.component
    * this caused work:
    ** strip app.component.ts moving most parts into technologies.component.ts
    ** move app.component.html content to technologies.component.html 
    ** move app.component.css content to technologies.component.css  
    * added app.routing.ts manually - ng has no generator at this beta release
    * NOTE: Some goofiness... get an error before "Select a Dashboard Hero": "... couldn't find component blah, blah, blah so stop/start server and error disappears
    ** Part 2 was a bear to debug. By FAR, this was the toughest tutorial (at 1:30 am)

### From HTTP tutorial
    * http module added by angular-cli from the start
    
## Notes added to code files
I went back through the TOH tutorials and added code comments from the tutorial that explained what I thought were key concepts for the marginally aware developer like 
myself. I really hope this helps someone but if not, it was a very good learning exercise to transform the tutorial into something a little more relevant for 
what I was trying to accomplish. 