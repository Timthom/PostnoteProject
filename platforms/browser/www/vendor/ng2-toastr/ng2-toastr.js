System.register(['./src/toast', './src/toast-manager', './src/toast-container.component', './src/toast-options'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (toast_1_1) {
                exportStar_1(toast_1_1);
            },
            function (toast_manager_1_1) {
                exportStar_1(toast_manager_1_1);
            },
            function (toast_container_component_1_1) {
                exportStar_1(toast_container_component_1_1);
            },
            function (toast_options_1_1) {
                exportStar_1(toast_options_1_1);
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=ng2-toastr.js.map