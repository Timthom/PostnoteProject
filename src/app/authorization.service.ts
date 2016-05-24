import {EventEmitter, Injectable, Inject} from "@angular/core";
import {User} from "./user.interface";
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
declare var Firebase: any;

@Injectable()
export class AuthorizationService {
    
    _userLoggedInSucceed;

    constructor(@Inject(FirebaseRef) private _ref: Firebase) {
       
    }
    
       // alert('Registreringen lyckades :)');
    createUserAccount(user: User) {
        this._ref.onAuth(this.authDataCallback);
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
      console.log('User is logged in');
    /* console.log("User " + authData.uid + " is logged in with " + authData.provider);
    console.log('AUTHDATACALLBACK!!!');
    var ref = new Firebase('https://scorching-torch-8126.firebaseio.com/');
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: authData.uid
    
    }); */
    
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
    
    loginFacebookAuth() {
        this._ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly" 
    });
}
    
    loginGoogleAuth() {
        this._ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly" 
    });
}
        
    isAuthenticated(): boolean {
       
        if(localStorage.getItem('token') == null) {
            localStorage.getItem('token');
        }
         
        return localStorage.getItem('token') !== null;
        
    }
    
    killAuth() {
        this._ref.unauth();
        localStorage.removeItem('token');
    }
}