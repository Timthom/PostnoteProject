import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide} from '@angular/core';
import { environment } from './app/';
import {AppComponent} from './app/app/';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2/angularfire2';
import {AuthorizationService} from "./app/authorization.service";
import { ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

if (environment.production) {
  enableProdMode();
}

let options = {
  positionClass: 'toast-bottom-left',
  toastLife: 3000
 
};

// document.addEventListener('deviceready', () => {
  bootstrap(AppComponent, [
  FIREBASE_PROVIDERS, [AuthorizationService, ToastsManager], provide(ToastOptions,{useValue:new ToastOptions(options)}),
  
  defaultFirebase('https://dazzling-fire-7472.firebaseio.com') 
  ]);
// }, false);
