<<<<<<< HEAD
const barrels: string[] = [
  'app',
  'app/shared',
  /** @cli-barrel */
];

function createPackageConfig(barrelList: string[]): any {
  return barrelList.reduce((barrelConfig: any, barrelName: string) => {
    barrelConfig[barrelName] = {
      format: 'register',
      defaultExtension: 'js',
      main: 'index'
    };
    return barrelConfig;
  }, {});
}


// Add your custom SystemJS configuration here.
export const config: any = {
  packages: Object.assign({
    // Add your custom SystemJS packages here.
    angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
    }
  }, createPackageConfig(barrels)),
  map: {
    'moment': 'vendor/moment/moment.js',
    'firebase': 'vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'vendor/angularfire2'
  }
};
=======
const barrels: string[] = [
  'app',
  'app/shared',
  'app/data',
  'app/creator',
  /** @cli-barrel */
];

function createPackageConfig(barrelList: string[]): any {
  return barrelList.reduce((barrelConfig: any, barrelName: string) => {
    barrelConfig[barrelName] = {
      format: 'register',
      defaultExtension: 'js',
      main: 'index'
    };
    return barrelConfig;
  }, {});
}


// Add your custom SystemJS configuration here.
export const config: any = {
  packages: Object.assign({
    // Add your custom SystemJS packages here.
    angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
    }
  }, createPackageConfig(barrels)),
  map: {
    'moment': 'vendor/moment/moment.js',
    'firebase': 'vendor/firebase/lib/firebase-web.js',
    'angularfire2': 'vendor/angularfire2'
  }
};
>>>>>>> master
