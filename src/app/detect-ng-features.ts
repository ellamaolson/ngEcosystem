import { ResourcesService, Resource } from './resources.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NpmResourceSet {
  [key: string]: Resource; // { string : Resource }
}

/**
 * Detects ng-update and ng-add features for all npm
 * packages in our database.
 */
export class NgFeatures {
  constructor(private resourceService: ResourcesService) {
    const subscription = this.getPackages().subscribe(npmPackages => {
      this.detectNgFeatures(npmPackages).then(results => {
        this.updateDatabase(results);
      });
      subscription.unsubscribe();
    });
  }

  /**
   * fill a NpmResourceSet with key : value pairs where
   * keys = npm package names: string
   * values = resources: Resource
   */
  getPackages(): Observable<NpmResourceSet> {
    return this.resourceService.getAllWaitingResources().pipe(
      map(resourceArray => {
        const npmObject = {};

        for (const item of resourceArray) {
          let npm = item.npm;

          // strip npm value just down to the package name
          if (npm != null && npm !== '' && npm !== undefined) {
            npm = npm.replace('https://www.npmjs.com/package/', '');
            npmObject[npm] = item;
          }
        }
        console.log('NPM_OBJECT\n', npmObject);
        return npmObject;
      })
    );
  }

  /**
   * Detect ng-update and ng-add features for each npm package
   * in the NpmResourceSet. Update the associated resource value
   * with new ng-update and ng-add values.
   * @param npmObject is a NpmResourceSet { npm: resource }
   */
  detectNgFeatures(npmObject: NpmResourceSet): Promise<NpmResourceSet> {
    const entries = Object.entries(npmObject);
    const promises = entries.map(entry => {
      const npm = entry[0];
      const myResource = entry[1]; // === npmObject[npm]
      // console.log('npm & resource || npmObject[npm]', npm, npmObject[npm]);

      return new Promise((resolve, reject) => {
        fetch('https://unpkg.com/' + npm + '/package.json')
          .then(result => result.json())
          .then(json => {
            npmObject[npm].ngUpdate = !!json['ng-update'];
            npmObject[npm].ngAdd = false;

            if (json['schematics']) {
              fetch(`https://unpkg.com/${npm}/${json['schematics']}`)
                .then(r => r.json())
                .then(result => {
                  npmObject[npm].ngAdd = !!result['schematics']['ng-add'];
                  resolve();
                });
            } else {
              npmObject[npm].ngAdd = false;
              resolve();
            }
          });
      });
    });
    return Promise.all(promises).then(() => npmObject);
  }

  /**
   * Update the database with new ng-update and ng-add values
   * @param npmObject is a NpmResourceSet { npm: resource }
   */
  updateDatabase(npmObject: NpmResourceSet) {
    const entries = Object.entries(npmObject);

    // Iterate through the result set
    for (const entry of entries) {
      const myNpm = entry[0];
      const myResource = entry[1];

      console.log('Updated resource: ', myResource);
      this.resourceService.updateResource(myResource);
    }
  }
}
