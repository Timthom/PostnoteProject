import {Component, EventEmitter} from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";
import {CreateUserAccountComponent} from '../createuser.components/create-user-account.component';
import {LoginComponent} from '../login.components/login.component';
import {Postnote2App} from '../postnote2.component';
import {MenuComponent} from '../menu.component';
import {LogoutComponent} from '../logout/logout.component';

@Component({
    moduleId: module.id,
    selector: 'user-handler',
    templateUrl: 'user-handler.component.html',
    styleUrls: ['user-handler.component.css'],
    directives: [ROUTER_DIRECTIVES, CreateUserAccountComponent, LoginComponent, Postnote2App, MenuComponent, LogoutComponent],
    outputs: ['_userLoggedOut']
})

export class UserHandlerComponent {
    
    switchWindow = false;
    loggingOut = false;
    
    constructor(private _authServiceHandler: AuthorizationService, private _router: Router) {
        
    }

    isAuth() {
        //console.log("Auth method is working!");
        return this._authServiceHandler.isAuthenticated();
        
        }

        logoutUser() {
            //console.log("Loggas ut?");
          this._authServiceHandler.killAuth();
          this._router.renavigate();  
          this.switchWindow = false;
          this._router.parent.navigate(['UserHandlerRoute']);
          
            
        }
        
        switchTo(): boolean {
            return this.switchWindow;
        }
        
        isLoggingOut(){
            return this.loggingOut;
        }
        
        switchToCreateAccountWindow() {
            this.switchWindow = true;
            // this._router.parent.navigate(['CreateUserAccountRoute']);
        }
        
        switchToLoginWindow() {
            // this._router.parent.navigate(['LoginUserRoute']);
            this.switchWindow = false;
            
        }
        
        switchToLogoutWindow() {
            //console.log("Byter till logout!");
            //console.log(this.loggingOut);
            this.loggingOut = !this.loggingOut;
        }
        
    }