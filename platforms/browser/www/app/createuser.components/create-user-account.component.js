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
        this.error = false;
        this.errorMessage = '';
    }
    CreateUserAccountComponent.prototype.onCreateAccount = function () {
        this._authService.createUserAccount(this.myForm.value);
    };
    CreateUserAccountComponent.prototype.ngOnInit = function () {
        this.myForm = this._fb.group({
            email: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    this.checkIfEmailIsValid
                ])],
            password: ['', common_1.Validators.required],
            confirmPassword: ['', common_1.Validators.compose([
                    common_1.Validators.required,
                    this.checkIfPassWordsMatch.bind(this)
                ])],
        });
    };
    CreateUserAccountComponent.prototype.checkIfEmailIsValid = function (control) {
        if (!control.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            return { noEmail: true };
        }
    };
    CreateUserAccountComponent.prototype.checkIfPassWordsMatch = function (control) {
        if (!this.myForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    };
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