"use strict";
var testing_1 = require('@angular/core/testing');
var reverse_pipe_1 = require('./reverse.pipe');
testing_1.describe('Reverse Pipe', function () {
    testing_1.beforeEachProviders(function () { return [reverse_pipe_1.Reverse]; });
    testing_1.it('should transform the input', testing_1.inject([reverse_pipe_1.Reverse], function (pipe) {
        testing_1.expect(pipe.transform(true)).toBe(null);
    }));
});
//# sourceMappingURL=reverse.pipe.spec.js.map