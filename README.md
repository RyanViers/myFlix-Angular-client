# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Description
The myFlix-Angular-client is the frontend client-side application built using Angular based on its existing server-side code (REST API and database),
with supporting documentation.

### User Stories
* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

### Key Features
* Welcome view where users are able to either log in or register an account
* Upon authentication, display a view of all Movies
* After login, users will be taken to the movie view that contains a list of all movies with 4 buttons:
  * A button to open the director dialog, where details about the director of that particular movie will be displayed.
  * A button to open the genre dialog, where details about that particular genre of the movie will be displayed.
  * A button to open the synopsis dialog, where details about that particular movie will be displayed.
  * A favorite button to add or remove a movie to users favorite list.
* A Navbar with 3 buttons:
  * A button to take users to the movie view.
  * A logout button, which logs out the user and navigates them back to the welcome screen.
  * A profile button, which navigates the user to their profile view.
* Profile view shows all information about a particular user:
  * A button to update the users profile information.
  * A button to delete the users profile and navigate them back to the welcome screen.
  * A list of the users favorite movies with a button to delete specified movie from the list.
