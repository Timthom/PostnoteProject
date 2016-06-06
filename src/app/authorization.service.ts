import {EventEmitter, Injectable, Inject} from "@angular/core";
import {User} from "./user.interface";
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';
declare var Firebase: any;

@Injectable()
export class AuthorizationService {
    
    _userLoggedInSucceed;
    user: any;
    
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
                console.log(authData.password.email);  
                alert("Du är nu inloggad!");
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    var exists = (snapshot.val() !== null);
                    if(!exists) {
                        ref.child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.password.email       
                        });
                    }
                    console.log(exists);
                });      
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
                console.log(authData.facebook.email);
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    var exists = (snapshot.val() !== null);
                    if(!exists) {
                        ref.child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.facebook.email       
                        });
                    }
                    console.log(exists);
                });
            }
        }, { remember: "default", scope: "email"
    });
}
    
    loginGoogleAuth() {
        this._ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
                console.log(authData.google.email); 
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    var exists = (snapshot.val() !== null);
                    if(!exists) {
                        ref.child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.google.email       
                        });
                    }
                    console.log(exists);
                });
                
            }
        }, { remember: "default", scope: "email"
    });
}

    loginTwitterAuth() {
        this._ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
                console.log(authData);
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    var exists = (snapshot.val() !== null);
                    if(!exists) {
                        ref.child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.twitter.username       
                        });
                    }
                    console.log(exists);
                });
            }
        }, { remember: "default", scope: "username"
    });
}

    loginGitHubAuth() {
        this._ref.authWithOAuthPopup("github", function(error, authData) {   
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                localStorage.setItem('token', authData.token);
                console.log(authData.provider);
                console.log(authData.github.username);
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    var exists = (snapshot.val() !== null);
                    if(!exists) {
                        ref.child(authData.uid).set({
                        provider: authData.provider,
                        email: authData.github.email       
                        });
                    }
                    console.log(exists);
                });
            }
        }, { remember: "default", scope: "user"
    });
}
   
    isAuthenticated(): boolean {
       
        if(localStorage.getItem('token') == null) {
            localStorage.getItem('token');
        }

        if(this._ref.getAuth() != null && this.user == null) {
            this.getLoggedInUser().then(res => this.user = res);
        }
         
        return localStorage.getItem('token') !== null; 
    }
    
    killAuth() {
        this._ref.unauth();
        localStorage.removeItem('token');
    }
    
    getLoggedInUser() {
        var authData = this._ref.getAuth();
        var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users/" + authData.uid);
        return ref.once("value").then((snapshot) => {
            return snapshot.val().email;
        });
     }
     
     returnLoggedInUser() {
         return this.user;
     }     
}
