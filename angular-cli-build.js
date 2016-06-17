/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'bootstrap/dist/css/bootstrap.min.css',
      'ng2-bootstrap/bundles/ng2-bootstrap.min.js',
      'moment/moment.js',
      'angularfire2/**/*.js',
      'firebase/lib/*.js',
      //Adding everthing below for DRAGULA??? Do I need another level down... Atoa etc..
      'dragula/dist/dragula.min.*',
      'ng2-dragula/**',
      'contra/dist/contra.min.js',
      'crossvent/dist/crossvent.min.js',
      //.....................................
      // 'desandro-classie/classie.js',
      'ng2-toastr/**/*',
      'ng2-cookies/**'
    ]
  });
};
