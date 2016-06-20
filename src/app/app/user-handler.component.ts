import {Component, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';
import {LoginComponent} from '../login.components/login.component';
import {Postnote2App} from '../postnote2.component';
import {MenuComponent} from '../menu.component';
import {LogoutComponent} from '../logout/logout.component';
import { LocalStorageService } from '../localstorage.service'
import {Input, Inject, Injectable} from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

@Component({
    moduleId: module.id,
    selector: 'user-handler',
    templateUrl: 'user-handler.component.html',
    styleUrls: ['user-handler.component.css'],
    directives: [ROUTER_DIRECTIVES, CreateUserAccountComponent, LoginComponent, Postnote2App, MenuComponent, LogoutComponent],
    outputs: ['_userLoggedOut'],
    providers: [LocalStorageService],
})

export class UserHandlerComponent {
    
    switchWindow = false;
    loggingOut = false;
    loggingIn = false;
    createUser = false;
    sessionExpired = false;
    
    constructor(private _authServiceHandler: AuthorizationService, private _router: Router, @Inject(FirebaseRef) private _ref: Firebase, public toastr: ToastsManager) {}

    isAuth() {
        return this._authServiceHandler.isAuthenticated();
    }

    logoutUser() {
        this._router.parent.navigate(['UserHandlerRoute']); 
        this._authServiceHandler.killAuth();
        this.switchWindow = false;
        this.loggingOut = false;
        this.loggingIn = false;

        if(this.sessionExpired) {
            this.toastr.warning("Your session has expired. Please sign in again!", "Alert!");
        } else {
            this.toastr.info("You've been successfully signed out!");
        }

        this.sessionExpired = false;   
    }
        
        switchTo(): boolean {
            return this.switchWindow;
        }
        
        isLoggingOut(){
            return this.loggingOut;
        }
        
        isLoggingIn() {
            return this.loggingIn;
        }
        
        switchToLoginWindow() {
            if(this.createUser == true) {
                this.loggingIn = false;
                this.createUser = false;
            } else {
                this.loggingIn = !this.loggingIn;    
            }
        }
        
        switchToLogoutWindow() {
            this.checkIfUserSessionHasExpired();
            this.loggingOut = !this.loggingOut;
        }
        
        switchToCreateAccountWindow() {
            this.switchWindow = true;
        }
        
        isCreatingAccount() {    
            return this.createUser;   
        }
        
        createUserAccount() {
            this.loggingIn = false;
            this.createUser = true;
        }
        
        loginUser() {
            this.loggingIn = true;
            this.createUser = false;
        }
        
        checkIfUserSessionHasExpired() {
            var authData = this._ref.getAuth();
            if(authData != null) {
                
                var o = this;
                var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users/" + authData.uid);
                ref.once("value").then((snapshot) => {
            
                var d = new Date();          
                var n = d.getTime();
            
                var lastExpire = (snapshot.val().expire / 1000);  
                var currentExpire = (n / 1000);
            
                var result = currentExpire - lastExpire;
            
                if(result >= 1800) {
                    o.sessionExpired = true; 
                    o.logoutUser();   

                } else {            
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                    ref.child(authData.uid).once('value', function(snapshot) {
                            ref.child(authData.uid).update({
                                expire: n       
                        });
                    });
                }
            });            
        }
     }
}