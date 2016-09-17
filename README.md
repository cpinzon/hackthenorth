# HackTheNorth 2016
React and Flux workshop for Hack The North 2016

## Requirements

1. Node/NPM
2. Gulp

#### Gulp

Gulp is a build system, you can use it to automate common tasks. Gulp is built on Node.js, and both the Gulp source and your Gulp file, where you define tasks, are written in JavaScript.
Gulp is open source and can be found on [GitHub](https://github.com/gulpjs/gulp/).

##### Local development
  * Open a terminal window and navigate to the root project directory
  * Install the project dependencies
  	* run: `npm install`
  	* run: `bower install`
  * Start the local server
  	* run: `gulp build`
    
    This will open a browser window with the application running on port 3000.
    You are now able to freely edit or add code and it will be automatically compiled and
    the local application will be refreshed in the browser to reflect your changes.
    
## Flux architecture

All flux/js react files are organized into the following directories:

* `js/`
    * `src/`
        * `main.jsx`       <- file that initializes the whole flux architeture
        * `actions/`     <- Flux Actions
        * `components/`  <- React apps/components, for rendering DOM and listening to events
        * `constants/`   <- Just some constants that we'll use elsewhere
        * `dispatcher/`  <- Flux Dispatcher
        * `models/`      <- Keep empty models here
        * `stores/`      <- Flux Stores - all business logic is stored and acted upon here