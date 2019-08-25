# Visualizer

## Code Structure
* `src`   
    * `app`  
        * `header`  : header component 
        * `user`    : service and models for managing user information
        * `visual`  : components for rendering svg snippets on page using d3
        * `assets/data.json`    : data containing initial seed values of users and their friends
        

## Assumptions
All users have distinct first name and last name combinations. The combination of first name & last name are used to determine 
if the user already exists in the system or not.
          
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

