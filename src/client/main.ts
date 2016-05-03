import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {environment} from './app/environment';
import {Postnote2App} from './app/postnote2.component';

if (environment.production) {
  enableProdMode();
}

bootstrap(Postnote2App);
