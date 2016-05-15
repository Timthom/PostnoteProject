import {Component, OnInit} from "@angular/core";
import {FormBuilder, ControlGroup, Validators} from "@angular/common";
import {AuthorizationService} from "../authorization.service";

@Component({
  moduleId: module.id,
  selector: 'creator',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [],
  pipes: [],
  providers: []
})

export class LoginComponent implements OnInit {
    myForm: ControlGroup;
    error = false;
    errorMessage = '';

    constructor(private _fb: FormBuilder, private _authService: AuthorizationService) {}

    onLoggedIn() {
        this._authService.loginUser(this.myForm.value);
    }

    ngOnInit():any {
        this.myForm = this._fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}