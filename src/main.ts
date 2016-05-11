import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Postnote2App, environment } from './app/';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2/angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(Postnote2App, [
 FIREBASE_PROVIDERS,
 defaultFirebase('https://dazzling-fire-7472.firebaseio.com')
]);
