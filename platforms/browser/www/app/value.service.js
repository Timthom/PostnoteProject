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
var ValueService = (function () {
    function ValueService() {
        this._showSideBar = false;
        this._toggleExpand = false;
        this._focusedId = '';
        this._focusedNoteKeys = [];
    }
    Object.defineProperty(ValueService.prototype, "showSideBar", {
        get: function () {
            return this._showSideBar;
        },
        set: function (b) {
            this._showSideBar = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueService.prototype, "toggleExpand", {
        // getters and setter for the toggle arrow
        get: function () {
            return this._toggleExpand;
        },
        set: function (b) {
            this._toggleExpand = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueService.prototype, "focusedId", {
        get: function () {
            return this._focusedId;
        },
        set: function (id) {
            this._focusedId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueService.prototype, "focusedNoteKeys", {
        get: function () {
            return this._focusedNoteKeys;
        },
        set: function (keys) {
            this._focusedNoteKeys = keys;
        },
        enumerable: true,
        configurable: true
    });
    ValueService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ValueService);
    return ValueService;
}());
exports.ValueService = ValueService;
//# sourceMappingURL=value.service.js.map