import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {environment} from './app/environment';
import {Postnote2App} from './app/postnote2.component';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2/angularfire2';
import 'rxjs/Rx';
import {ROUTER_PROVIDERS} from "angular2/router";

if (environment.production) {
  enableProdMode();
}

bootstrap(Postnote2App, [ROUTER_PROVIDERS, FIREBASE_PROVIDERS,
 defaultFirebase('https://dazzling-fire-7472.firebaseio.com')
]);
  