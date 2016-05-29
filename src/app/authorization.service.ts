import {EventEmitter, Injectable, Inject} from "@angular/core";
import {User} from "./user.interface";
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
declare var Firebase: any;

@Injectable()
export class AuthorizationService {
    
    _userLoggedInSucceed;

    constructor(@Inject(FirebaseRef) private _ref: Firebase) {}

    createUserAccount(user: User) {
        this._ref.createUser({
            email: user.email,
            password: user.password
        }, function(error, userData) {
            if (error) {
                alert('E-post adressen finns redan. Välj en annan!');
            } else {
                alert("Registreringen lyckades");
            }
        });
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
                alert("Du är nu inloggad!");
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

    loginTwitterAuth() {
        this._ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
            }
        }, { remember: "sessionOnly" 
    });
}

    loginGitHubAuth() {
        this._ref.authWithOAuthPopup("github", function(error, authData) {
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