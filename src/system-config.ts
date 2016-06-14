/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/lib/firebase-web.js',
  'angularfire2': 'vendor/angularfire2',
  'moment': 'vendor/moment/moment.js',
  
  'ng2-dragula': 'vendor/ng2-dragula',
  'ng2-toastr': 'vendor/ng2-toastr',
  'dragula': 'vendor/dragula/dist/dragula.min.js',
  'lodash': 'node_modules/lodash/lodash.js',
  'desandro-classie': 'vendor/desandro-classie/classie.js'

  
};

/** User packages configuration. */
const packages: any = {
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
  'desandro-classie': {
    defaultExtension: 'js',
    main: 'classie.js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
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
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

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
System.config({ map, packages });
