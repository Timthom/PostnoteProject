import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import {AuthorizationService} from "../authorization.service";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router-deprecated';

@Component({
  moduleId: module.id,
  selector: 'login-user',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES],
  pipes: [],
  providers: []
})

export class LoginComponent implements OnInit {
    @Output() emitCreateUserAccount = new EventEmitter();
    
    myForm: ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb: FormBuilder, private _authService: AuthorizationService, private _router: Router) {}

    onLoggedIn() {
        this._authService.loginUser(this.myForm.value);
        /* if(this._authService.loginSuccess()) {
            this._router.parent.navigate(['PostnoteAppRoute']);
        } */
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    
    loginWithFacebook() {
       this._authService.loginFacebookAuth();
    }
    
    loginWithGoogle() {
        this._authService.loginGoogleAuth();
    }
    
    loginWithTwitter() {
        this._authService.loginTwitterAuth();
    }  
    
    loginWithGitHub() {
        this._authService.loginGitHubAuth();
    }
    
    createAccountWindow() {
        console.log("Create account click is working!");
        this.emitCreateUserAccount.emit('');
    }
}