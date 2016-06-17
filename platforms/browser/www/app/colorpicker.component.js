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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var data_service_1 = require('./data.service');
var ColorpickerComponent = (function () {
    function ColorpickerComponent(_ds) {
        this._ds = _ds;
        this.changeColor = new core_1.EventEmitter();
        this.showingColors = false;
    }
    ColorpickerComponent.prototype.ngOnInit = function () {
    };
    ColorpickerComponent.prototype.selectColor = function (color) {
        this.changeColor.emit(color);
        this.showingColors = false;
    };
    ColorpickerComponent.prototype.colorButtonClick = function () {
        this.showingColors = !this.showingColors;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ColorpickerComponent.prototype, "changeColor", void 0);
    ColorpickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'colorpicker',
            providers: [router_deprecated_1.ROUTER_PROVIDERS],
            templateUrl: 'colorpicker.component.html',
            styleUrls: ['colorpicker.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            pipes: []
        }),
        router_deprecated_1.RouteConfig([]), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], ColorpickerComponent);
    return ColorpickerComponent;
}());
exports.ColorpickerComponent = ColorpickerComponent;
//# sourceMappingURL=colorpicker.component.js.map