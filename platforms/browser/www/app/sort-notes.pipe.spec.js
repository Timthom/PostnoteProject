"use strict";
var testing_1 = require('@angular/core/testing');
var sort_notes_pipe_1 = require('./sort-notes.pipe');
testing_1.describe('SortNotes Pipe', function () {
    testing_1.beforeEachProviders(function () { return [sort_notes_pipe_1.SortNotes]; });
    testing_1.it('should transform the input', testing_1.inject([sort_notes_pipe_1.SortNotes], function (pipe) {
        testing_1.expect(pipe.transform(true)).toBe(null);
    }));
});
//# sourceMappingURL=sort-notes.pipe.spec.js.map