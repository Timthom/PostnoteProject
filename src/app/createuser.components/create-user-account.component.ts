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
        console.log(this.myForm.value.email);
        /* Password matching expression. Password must be at least 8 characters, no more than 20 characters, 
        and must include at least one upper case letter, one lower case letter, and one numeric digit. */
        // var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        
        var re = /[0-9]/;
        var re_2 = /[A-Z]/;
        var re_3 = /[a-z]/;
        var re_4 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(this.myForm.value.password != this.myForm.value.confirmPassword) {
            alert('Error: passwords do not match!');
        } else if(!re.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one number!');
        } else if(!re_2.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one uppercase letter!');
        } else if(!re_3.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one lowercase letter (a-z)!');
        } else if(this.myForm.value.password.length < 8) {
            alert('Error: password must contain at least 8 characters!');
        } else if(this.myForm.value.password.length > 20) {
            alert('Error: password must be less than 20 charachters!');
        } else if(!re_4.test(this.myForm.value.email)) {
            alert('Error: You must enter a valid email address as username!');
        } else {
            this._authService.createUserAccount(this.myForm.value);
            this.switchBackToLoginComponent();
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
        this.emitLoginUserAccountWindow.emit('');
        console.log("GoBack button is working!!!");
    }
}