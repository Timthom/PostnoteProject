import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './app/';
import {AppComponent} from './app/app/';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2/angularfire2';
import {AuthorizationService} from "./app/authorization.service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
 FIREBASE_PROVIDERS, AuthorizationService, 
 defaultFirebase('https://dazzling-fire-7472.firebaseio.com')
]);

