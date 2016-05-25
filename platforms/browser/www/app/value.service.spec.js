"use strict";
var testing_1 = require('@angular/core/testing');
var value_service_1 = require('./value.service');
testing_1.describe('Value Service', function () {
    testing_1.beforeEachProviders(function () { return [value_service_1.ValueService]; });
    testing_1.it('should ...', testing_1.inject([value_service_1.ValueService], function (service) {
        testing_1.expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=value.service.spec.js.map