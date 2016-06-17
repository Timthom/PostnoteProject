System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Toast;
    return {
        setters:[],
        execute: function() {
            Toast = (function () {
                function Toast(type, message, title) {
                    this.type = type;
                    this.message = message;
                    this.title = title;
                }
                return Toast;
            }());
            exports_1("Toast", Toast);
        }
    }
});
//# sourceMappingURL=toast.js.map