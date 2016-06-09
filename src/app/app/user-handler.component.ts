import {Component, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';
import {LoginComponent} from '../login.components/login.component';
import {Postnote2App} from '../postnote2.component';
import {MenuComponent} from '../menu.component';
import {LogoutComponent} from '../logout/logout.component';
import {CanReuse} from "@angular/router-deprecated";
import { LocalStorageService } from '../localstorage.service'
import {Input, Inject, Injectable} from '@angular/core';
import { defaultFirebase, FirebaseRef } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'user-handler',
    templateUrl: 'user-handler.component.html',
    styleUrls: ['user-handler.component.css'],
    directives: [ROUTER_DIRECTIVES, CreateUserAccountComponent, LoginComponent, Postnote2App, MenuComponent, LogoutComponent],
    outputs: ['_userLoggedOut'],
    providers: [LocalStorageService],
})

export class UserHandlerComponent implements CanReuse  {
    
    routerCanReuse() {  
        return false;
    }
    
    switchWindow = false;
    loggingOut = false;
    loggingIn = false;
    createUser = false;    
    
    constructor(private _authServiceHandler: AuthorizationService, private _router: Router, @Inject(FirebaseRef) private _ref: Firebase) {
        console.log("Refreshing???");
    }

    isAuth() {
        return this._authServiceHandler.isAuthenticated();
    }

        logoutUser() {
            //console.log("Loggas ut?");
          this._authServiceHandler.killAuth();
          this.switchWindow = false;
          this.loggingOut = false;
          this.loggingIn = false;   
          // this._router.renavigate();
          // this._router.parent.navigate(['UserHandlerRoute']);   
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
            // this._router.parent.navigate(['LoginUserRoute']);
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
            // this._router.parent.navigate(['CreateUserAccountRoute']);
        }
        
        isCreatingAccount() {    
            return this.createUser;   
        }
        
        createUserAccount() {
            // console.log("EventEmitter is working!?");
            this.loggingIn = false;
            this.createUser = true;
        }
        
        loginUser() {
            // console.log("Back button is working in user-handler!");
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
            
                console.log(lastExpire);
                console.log(currentExpire);
            
                var result = currentExpire - lastExpire;
                console.log(result);
            
                if(result >= 10) {
                    // o.value = false;      
                    o.logoutUser();   
                    alert("Your session has expired. Please log in again!");    
                } else {
                    // o.value = true;              
                    var ref = new Firebase("https://dazzling-fire-7472.firebaseio.com/users");
                    ref.child(authData.uid).once('value', function(snapshot) {
                        var exists = (snapshot.val() !== null);
                            ref.child(authData.uid).update({
                                expire: n       
                        });
                    });
                }
            });            
        }
     }
}