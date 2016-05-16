import {Injectable, Inject, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
declare var Firebase: any;

@Injectable()
export class AuthorizationService {
    private _userLoggedOut = new EventEmitter<any>();
    
    
    
    constructor(@Inject(FirebaseRef) private _ref: Firebase) {
        _ref.onAuth(this.authDataCallback);
    }
       // alert('Registreringen lyckades :)');
    createUserAccount(user: User) {
        this._ref.createUser({
            email: user.email,
            password: user.password
        }, function(error, userData) {
            if (error) {
                alert('E-post adressen finns redan. Välj en annan!');
            } else {
               
        }
    });
}

authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    
    var ref = new Firebase('https://dazzling-fire-7472.firebaseio.com');
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: authData.uid
    });
    
  } else {
    console.log("User is logged out");
  }
}



    loginUser(user: User) {
        this._ref.authWithPassword({
            email: user.email,
            password: user.password
            
        },  function(error, authData) {
            
            if (error) {
                alert("Fel användarnamn eller lösenord. Försök igen!");
            } else {
                localStorage.setItem('token', authData.token);
                console.log(authData);
                
            }
            
        });
    }
    
    

    logout() {
        localStorage.removeItem('token');
        this._userLoggedOut.emit(null);
    }
    
    getLoggedOutEvent(): EventEmitter<any> {
        return this._userLoggedOut;
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }
}