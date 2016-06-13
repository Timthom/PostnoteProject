"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var authorization_service_1 = require("../authorization.service");
var CreateUserAccountComponent = (function () {
    function CreateUserAccountComponent(_fb, _authService) {
        this._fb = _fb;
        this._authService = _authService;
        this.emitLoginUserAccountWindow = new core_1.EventEmitter();
        this.error = false;
        this.errorMessage = '';
    }
    CreateUserAccountComponent.prototype.onCreateAccount = function () {
        console.log(this.myForm.value.email);
        /* Password matching expression. Password must be at least 8 characters, no more than 20 characters,
        and must include at least one upper case letter, one lower case letter, and one numeric digit. */
        // var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        var re = /[0-9]/;
        var re_2 = /[A-Z]/;
        var re_3 = /[a-z]/;
        var re_4 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.myForm.value.password != this.myForm.value.confirmPassword) {
            alert('Error: passwords do not match!');
        }
        else if (!re.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one number!');
        }
        else if (!re_2.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one uppercase letter!');
        }
        else if (!re_3.test(this.myForm.value.password)) {
            alert('Error: password must contain at least one lowercase letter!');
        }
        else if (this.myForm.value.password.length < 8) {
            alert('Error: password must contain at least 8 characters!');
        }
        else if (this.myForm.value.password.length > 20) {
            alert('Error: password must be less than 20 charachters!');
        }
        else if (!re_4.test(this.myForm.value.email)) {
            alert('Error: You must enter a valid email address as username!');
        }
        else {
            this._authService.createUserAccount(this.myForm.value);
            this.switchBackToLoginComponent();
        }
    };
    CreateUserAccountComponent.prototype.ngOnInit = function () {
        this.myForm = this._fb.group({
            email: ['', common_1.Validators.required],
            password: ['', common_1.Validators.required],
            confirmPassword: ['', common_1.Validators.required],
        });
    };
    CreateUserAccountComponent.prototype.switchBackToLoginComponent = function () {
        this.emitLoginUserAccountWindow.emit('');
        console.log("GoBack button is working!!!");
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CreateUserAccountComponent.prototype, "emitLoginUserAccountWindow", void 0);
    CreateUserAccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'create-user-account',
            templateUrl: 'create-user-account.component.html',
            styleUrls: ['create-user-account.component.css'],
            directives: [],
            pipes: [],
            providers: []
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, authorization_service_1.AuthorizationService])
    ], CreateUserAccountComponent);
    return CreateUserAccountComponent;
}());
exports.CreateUserAccountComponent = CreateUserAccountComponent;
//# sourceMappingURL=create-user-account.component.js.map