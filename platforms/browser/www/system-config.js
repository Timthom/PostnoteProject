/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    'firebase': 'vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'vendor/angularfire2',
    'moment': 'vendor/moment/moment.js',
    'ng2-dragula': 'vendor/ng2-dragula',
    'ng2-toastr': 'vendor/ng2-toastr',
    'dragula': 'vendor/dragula/dist/dragula.min.js',
    'lodash': 'node_modules/lodash/lodash.js',
    'ng2-cookies': 'vendor/ng2-cookies'
};
/** User packages configuration. */
var packages = {
    angularfire2: {
        defaultExtension: 'js',
        main: 'angularfire2.js'
    },
    'ng2-dragula': {
        defaultExtension: 'js',
        main: 'ng2-dragula.js'
    },
    'ng2-toastr': {
        defaultExtension: 'js',
        main: 'ng2-toastr.js'
    },
    'ng2-cookies': {
        defaultExtension: 'js',
        main: 'ng2-cookies.js'
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    // App specific barrels.
    'app',
    'app/shared',
    'app/app',
    'app/headerbar',
    'app/logout-component',
    'app/logout',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map