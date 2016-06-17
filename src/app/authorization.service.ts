import {EventEmitter, Injectable, Inject} from "@angular/core";
import {User} from "./user.interface";
import { ToastsManager } from 'ng2-toastr/ng2-toastr'
import { AngularFire, defaultFirebase, FirebaseRef, FirebaseListObservable } from 'angularfire2';

declare var Firebase: any;

@Injectable()
export class AuthorizationService {
    
    user: any;
    expire: any;
    userExists: boolean;
    
    constructor(@Inject(FirebaseRef) private _ref: Firebase, public toastr: ToastsManager) {}

    createUserAccount(user: User) {

        var that = this;

        this._ref.createUser({
            email: user.email,
            password: user.password
        }, function(error, userData) {
            if (error) {
                that.toastr.error("The email address is already exists. Choose another one!", "Error!");
                that.userExists = false;
            } else {
                that.toastr.success("Your account has been successfully created!", "Success!");
                that.userExists = true;
            }
        });
    }

    loginUser(user: User) {

        var that = this;
        
        this.user = null;
        
        this._ref.authWithPassword({
            email: user.email,
            password: user.password
            
        },  function(error, authData) {
            
            if (error) {
                that.toastr.warning("Wrong username or password. Please try again!", "Alert!");
            
            } else {
                localStorage.setItem('token', authData.token);
                  
                that.toastr.info("Welcome, You are now logged in!");
                
                var d = new Date();
                var n = d.getTime();
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    
                    ref.child(authData.uid).update({
                    provider: authData.provider,
                    email: authData.password.email,
                    expire: n       
                     
                    });
                });      
            }        
        }); 
    }
    
    loginFacebookAuth() {

        var that = this;
        
        this.user = null;
        
        this._ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("facebook", function(error) {

                    that.toastr.info("Welcome, You are now logged in!");
                             
                    localStorage.setItem('token', authData.token);
                
                    var d = new Date();
                    var n = d.getTime(); 
                
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                    ref.child(authData.uid).once('value', function(snapshot) {
                    
                        ref.child(authData.uid).update({
                            provider: authData.provider,
                            email: authData.facebook.email,
                            expire: n       
                        
                            });
                        });     
                     });
                }          
            } 
            
            else if(authData) {

                that.toastr.info("Welcome, You are now logged in!");

                localStorage.setItem('token', authData.token);
                
                var d = new Date();
                var n = d.getTime();
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    
                    ref.child(authData.uid).update({
                    provider: authData.provider,
                    email: authData.facebook.email,
                    expire: n       
                        
                    });
                });
            }
        }, { remember: "default", scope: "email"
    });
}
    
    loginGoogleAuth() {

        var that = this;
        
        this.user = null;
        
        this._ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("google", function(error) {

                    that.toastr.info("Welcome, You are now logged in!");
                             
                    localStorage.setItem('token', authData.token);
                
                    var d = new Date();
                    var n = d.getTime(); 
                
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                    ref.child(authData.uid).once('value', function(snapshot) {
                    
                        ref.child(authData.uid).update({
                            provider: authData.provider,
                            email: authData.google.email,
                            expire: n       
                        
                            });
                        });     
                     });
                }          
            } 
            
            else if(authData) {

                that.toastr.info("Welcome, You are now logged in!");

                localStorage.setItem('token', authData.token);
                
                var d = new Date();
                var n = d.getTime();
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    
                    ref.child(authData.uid).update({
                    provider: authData.provider,
                    email: authData.google.email,
                    expire: n       
                        
                    });
                });
            }
        }, { remember: "default", scope: "email"
    });
}

    loginTwitterAuth() {

        var that = this;
        
        this.user = null;
        
        this._ref.authWithOAuthPopup("twitter", function(error, authData) {
            if (error) {
                
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("twitter", function(error) {

                    that.toastr.info("Welcome, You are now logged in!");
                             
                    localStorage.setItem('token', authData.token);
                
                    var d = new Date();
                    var n = d.getTime(); 
                
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                    ref.child(authData.uid).once('value', function(snapshot) {
                    
                        ref.child(authData.uid).update({
                            provider: authData.provider,
                            email: authData.twitter.username,
                            expire: n       
                        
                            });
                        });     
                     });
                }          
            } 
            
            else if(authData) {

                that.toastr.info("Welcome, You are now logged in!");

                localStorage.setItem('token', authData.token);
                
                var d = new Date();
                var n = d.getTime();
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    
                    ref.child(authData.uid).update({
                    provider: authData.provider,
                    email: authData.twitter.username,
                    expire: n       
                        
                    });
                });
            }
        }, { remember: "default", scope: "username"
    });
}

    loginGitHubAuth() {
        
        var that = this;
        
        this.user = null;
        
        this._ref.authWithOAuthPopup("github", function(error, authData) {
            if (error) {
                
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    ref.authWithOAuthRedirect("github", function(error) {

                    that.toastr.info("Welcome, You are now logged in!");
                             
                    localStorage.setItem('token', authData.token);
                
                    var d = new Date();
                    var n = d.getTime(); 
                
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                    ref.child(authData.uid).once('value', function(snapshot) {
                    
                        ref.child(authData.uid).update({
                            provider: authData.provider,
                            email: authData.github.email,
                            expire: n       
                        
                            });
                        });     
                     });
                }          
            } 
            
            else if(authData) {

                that.toastr.info("Welcome, You are now logged in!");

                localStorage.setItem('token', authData.token);
                
                var d = new Date();
                var n = d.getTime();
                
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
            
                ref.child(authData.uid).once('value', function(snapshot) {
                    
                    ref.child(authData.uid).update({
                    provider: authData.provider,
                    email: authData.github.email,
                    expire: n       
                        
                    });
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
            console.log(this.user);
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

     returnCreateUserSucceed() {
         return this.userExists;
     }
}
