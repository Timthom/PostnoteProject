"use strict";
var testing_1 = require('@angular/core/testing');
var first_letter_pipe_1 = require('./first-letter.pipe');
testing_1.describe('FirstLetter Pipe', function () {
    testing_1.beforeEachProviders(function () { return [first_letter_pipe_1.FirstLetter]; });
    testing_1.it('should transform the input', testing_1.inject([first_letter_pipe_1.FirstLetter], function (pipe) {
        testing_1.expect(pipe.transform(true)).toBe(null);
    }));
});
//# sourceMappingURL=first-letter.pipe.spec.js.map