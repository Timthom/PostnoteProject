/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/lib/firebase-web.js',
  'angularfire2': 'vendor/angularfire2',
  'moment': 'vendor/moment/moment.js',
  
  
  
  //Put dragula stuff here?......
  'dragula': 'vendor/dragula/dist/dragula.min.js',
  'ng2-dragula': 'vendor/ng2-dragula/ng2-dragula.js',
  'contra': 'vendor/contra/dist/contra.min.js',
  'crossvent': 'vendor/crossvent/dist/crossvent.min.js'
  //..............................
  
  
  
  
};

/** User packages configuration. */
const packages: any = {
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
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
  
  
  
  //Put the dragula libraries here as third party barrels.....
  'ng2-dragula',
  'dragula',
  'contra',
  'crossvent',
  //..............................................
  
  

  // App specific barrels.
  'app',
  'app/shared',
  'app/app',
  'app/headerbar',
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
    'main': 'main.js',



    //Put dragula stuff here?......
    'dragula': 'vendor/dragula/dist/dragula.min.js',
    'ng2-dragula': 'vendor/ng2-dragula/ng2-dragula.js',
    'contra': 'vendor/contra/dist/contra.min.js',
    'crossvent': 'vendor/crossvent/dist/crossvent.min.js'
    //..............................



  },
  paths: {
    
    
              'dragula': 'node_modules/dragula/dist/dragula.js',
          'ng2-dragula/*': 'node_modules/ng2-dragula/ng2-dragula.js'
    //Put dragula stuff here?......
    // 'dragula': 'vendor/dragula/dist/dragula.min.js',
    // 'ng2-dragula': 'vendor/ng2-dragula/ng2-dragula.js',
    // 'contra': 'vendor/contra/dist/contra.min.js',
    // 'crossvent': 'vendor/crossvent/dist/crossvent.min.js'
    //..............................
  
  
  
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
