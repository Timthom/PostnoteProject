import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FormBuilder, ControlGroup, Validators, Control} from "@angular/common";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {AuthorizationService} from "../authorization.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  moduleId: module.id,
  selector: 'create-user-account',
  templateUrl: 'create-user-account.component.html',
  styleUrls: ['create-user-account.component.css'],
  directives: [],
  pipes: [],
  providers: [ToastsManager]
})

export class CreateUserAccountComponent implements OnInit {
    @Output() emitLoginUserAccountWindow = new EventEmitter();
    
    myForm:ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb:FormBuilder, private _authService: AuthorizationService, public toastr: ToastsManager) {}

    onCreateAccount() {
        /* Password matching expression. Password must be at least 8 characters, no more than 20 characters, 
        and must include at least one upper case letter, one lower case letter, and one numeric digit. */
        var re_1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        var re_2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(this.myForm.value.password != this.myForm.value.confirmPassword) {
            this.toastr.error('Passwords do not match!', "Error!");
        } else if(!re_2.test(this.myForm.value.email)) {
            this.toastr.error('You must enter a valid email address as a username!', 'Error!');
        } else if(!(re_1.test(this.myForm.value.password))) {
            this.toastr.error('Password must be between 8 and 20 characters, contain one upper case letter and one number!', "Error!");            
        } else {

            var that = this;
            this._authService.createUserAccount(that.myForm.value);

            setTimeout(function() {
                if(that._authService.returnCreateUserSucceed()) {
                    that.switchBackToLoginComponent();
                }
            }, 1500);         
        }
    }
    
    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword:['', Validators.required],
        });
    }
    
    switchBackToLoginComponent() {
        console.log("3");
        this.emitLoginUserAccountWindow.emit('');
    }
}