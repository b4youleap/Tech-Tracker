import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnologiesComponent } from './technologies/technologies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechDetailComponent } from './tech-detail/tech-detail.component';

const appRoutes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'technologies',
        component: TechnologiesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'detail/:id',
        component: TechDetailComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

/*      Notes on Routing:
The Routes are an array of route definitions. 

The route definition has the following parts:

path: the router matches this route's path to the URL in the browser address bar (i.e. technologies).
component: the component that the router should create when navigating to this route (i.e. TechnologiesComponent).

We export a routing constant initialized using the RouterModule.forRoot method applied to our array of routes. 
This method returns a configured router module that we'll add to our root NgModule, AppModule.

We call the forRoot method because we're providing a configured router at the root of the application. The forRoot 
method gives us the Router service providers and directives needed for routing.

Router Outlet
If we paste the path, /technologies, into the browser address bar, the router should match it to the technologies 
route and display the TechnologiesComponent. But where?

We have to tell it where by adding a <router-outlet> element to the bottom of the html template defined in templateUrl. 
RouterOutlet is one of the directives provided by the RouterModule. The router displays each component immediately 
below the <router-outlet> as we navigate through the application.

Router Links
We don't really expect users to paste a route URL into the address bar. We add an anchor tag to the template which, 
when clicked, triggers navigation to the TechnologiesComponent.

Notice the routerLink binding in the anchor tag (in app.component.html). We bind the RouterLink directive (another 
of the RouterModule directives) to a string that tells the router where to navigate when the user clicks the link.

Since our link is not dynamic, we define a routing instruction with a one-time binding to our route path. Looking 
back at the route configuration, we confirm that '/technologies' is the path of the route to the TechnologiesComponent.

REDIRECTTO

We want the app to show the dashboard when it starts and we want to see a nice URL in the browser address bar that 
says /dashboard. Remember that the browser launches with / in the address bar.

We use a redirect route to make this happen.

CONFIGURE A ROUTE WITH A PARAMETER
The colon (:) in the path indicates that :id is a placeholder to be filled with a specific technology id when 
navigating to the TechDetailComponent. (I should have NOT abbreviated TechDetail but oh well.)
*/
