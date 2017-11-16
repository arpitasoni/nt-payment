# About

This is a fork of [Angular Seed](https://github.com/angular/angular-seed) but with full RequireJS support.

* AngularJS 1.4.x
* RequireJS 2.1.x
* Full support for unit tests using Karma
* Full support for e2e tests using Protractor

## Changes & Notes

* Removed `index-async.html` and all the related logic & tasks. Original seed project offers a way to asynchroneusly load initial set of js files using a custom loader.
* Bootstraping file (`require-config.js`) is used for both unit testing and bootstraping on the actual page. If you don't plan to build your sources using `r.js`, you should consider removing logic related to Karma before using this file in production. 

## Installation

    git clone https://github.com/arpitasoni/nt-payment.git
    npm install
    bower install

## Running

    npm start
    
## More Info at 

https://github.com/marcoslin/angularAMD
