import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";

@Component({
  moduleId: module.id,
  selector: 'create-user-account',
  templateUrl: 'create-user-account.component.html',
  styleUrls: ['create-user-account.component.css'],
  directives: [],
  pipes: [],
  providers: []
})

export class CreateUserAccountComponent implements OnInit {
    @Output() emitLoginUserAccountWindow = new EventEmitter();
    
    myForm:ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb:FormBuilder, private _authService: AuthorizationService) {}

    onCreateAccount() {
        this._authService.createUserAccount(this.myForm.value);
        this.switchBackToLoginComponent();
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.checkIfEmailIsValid
            ])],
            
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.checkIfPassWordsMatch.bind(this)
            ])],
        });
    }

    checkIfEmailIsValid(control:Control):{[s: string]: boolean} {
        if (!control.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return {noEmail: true};
        }
    }

    checkIfPassWordsMatch(control:Control):{[s: string]: boolean} {    
        if (!this.myForm) {
            return {passwordsNotMatch: true};

        } 
        
        if (control.value !== this.myForm.controls['password'].value) {
            return {passwordsNotMatch: true};
        }
    }
    
    switchBackToLoginComponent() {
        this.emitLoginUserAccountWindow.emit('');
        console.log("GoBack button is working!!!");
    }
}