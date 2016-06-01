import {Component, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';
import {LoginComponent} from '../login.components/login.component';
import {Postnote2App} from '../postnote2.component';
import {MenuComponent} from '../menu.component';
import {LogoutComponent} from '../logout/logout.component';
import {CanReuse} from "@angular/router-deprecated";

@Component({
    moduleId: module.id,
    selector: 'user-handler',
    templateUrl: 'user-handler.component.html',
    styleUrls: ['user-handler.component.css'],
    directives: [ROUTER_DIRECTIVES, CreateUserAccountComponent, LoginComponent, Postnote2App, MenuComponent, LogoutComponent],
    outputs: ['_userLoggedOut']
})

export class UserHandlerComponent implements CanReuse  {
    
    routerCanReuse() {  
        return false;
    }
    
    switchWindow = false;
    loggingOut = false;
    loggingIn = false;
    createUser = false;    
    
    constructor(private _authServiceHandler: AuthorizationService, private _router: Router) {
        console.log("Refreshing???");
    }

    isAuth() {
        //console.log("Auth method is working!");
        return this._authServiceHandler.isAuthenticated();
        
        }

        logoutUser() {
          console.log("Loggas ut?");
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
            console.log("Byter till logout!");
            console.log(this.loggingOut);
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
            console.log("EventEmitter is working!?");
            this.loggingIn = false;
            this.createUser = true;
        }
        
        loginUser() {
            console.log("Back button is working in user-handler!");
            this.loggingIn = true;
            this.createUser = false;
        }
    }