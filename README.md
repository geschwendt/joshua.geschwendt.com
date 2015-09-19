<p align="center">
  <a href="http://joshua.geschwendt.com">
    <img height="257" width="257" src="https://avatars0.githubusercontent.com/u/9220949?v=3&s=460">
  </a>
</p>

<h1 align="center"><a href="joshua.geschwendt.com">joshua.geschwendt.com</h1>

<p align="center">
  <a href="https://travis-ci.org/geschwendt/joshua.geschwendt.com"><img alt="Build Status" src="https://img.shields.io/travis/geschwendt/joshua.geschwendt.com/master.svg?style=flat"/></a>
  <a href="https://buildtimetrend.herokuapp.com/dashboard/geschwendt/joshua.geschwendt.com/"><img alt="Buildtime trend" src="https://buildtimetrend.herokuapp.com/badge/geschwendt/joshua.geschwendt.com/latest"/></a>
  <a href="https://coveralls.io/r/geshwendt/joshua.geschwendt.com?branch=master"><img alt="Coveralls Status" src="http://img.shields.io/coveralls/geschwendt/joshua.geschwendt.com.svg?style=flat"/></a>
  <a href="https://david-dm.org/geschwendt/joshua.geschwendt.com"><img alt="Dependency Status" src="https://david-dm.org/geschwendt/joshua.geschwendt.com.svg?style=flat"/></a>
  <a href="https://david-dm.org/geschwendt/joshua.geschwendt.com#info=devDependencies"><img alt="devDependency Status" src="https://david-dm.org/geschwendt/joshua.geschwendt.com/dev-status.svg?style=flat"/></a>	  
</p>

<!-- ----------------------------------------------------------------------- -->

[joshua.geschwendt.com]: http://joshua.geschwendt.com

[travis-url]: https://travis-ci.org/geschwendt/joshua.geschwendt.com
[travis-image]: https://img.shields.io/travis/geschwendt/joshua.geschwendt.com/master.svg?style=flat

[buildtime-trend-url]: https://buildtimetrend.herokuapp.com/dashboard/geschwendt/joshua.geschwendt.com/
[buildtime-trend-image]: https://buildtimetrend.herokuapp.com/badge/geschwendt/joshua.geschwendt.com/latest

[coveralls-url]: https://coveralls.io/r/geshwendt/joshua.geschwendt.com?branch=master
[coveralls-image]: http://img.shields.io/coveralls/geschwendt/joshua.geschwendt.com.svg?style=flat

[david-dependencies-url]: https://david-dm.org/geschwendt/joshua.geschwendt.com
[david-dependencies-image]: https://david-dm.org/geschwendt/joshua.geschwendt.com.svg?style=flat

[david-dev-dependencies-url]: https://david-dm.org/geschwendt/joshua.geschwendt.com#info=devDependencies
[david-dev-dependencies-image]: https://david-dm.org/geschwendt/joshua.geschwendt.com/dev-status.svg?style=flat

<!-- ----------------------------------------------------------------------- -->
________________________________________________________________________________


This project is under very active development. 
Large changes will be implemented, as i get familiar with es6/es7 and typescript and their best practices. 
The dependencies are going to be updated as soon as a new release is avalable, as most of the them are in either in an alpha or beta release and somewhat unstable.

One of the larger goals here is to achieve a syntax simmilar to AngularJS 2.x while still using the Angular 1.x library, heavy decorator use (es7), which also has an API that tends to be changed every so often.

## Current Tech-Stack

- Gulp 4 (task runner - babel es6)
- Broccoli (todo: build system, this will come much later as the plugin ecosystem is very young)
- JSPM/SystemJs - for es6 module support
- Typescript - for transpiling es6 to es5 and use a strongly typed language
- Sass - (could switch to postCSS at some point, I like this approach - CSS4 support)

- Karma (todo)
- Mocha (todo)

- Express (todo - also in typescript and es6) 

## Getting Started

- clone the repository
```shell
git clone https://github.com/geschwendt/joshua.geschwendt.com.git
```

- install dependencies dependencies
```shell
$(npm/bin) install
```

- start the server
```shell
npm run gulp serve
```
