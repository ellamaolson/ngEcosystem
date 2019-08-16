import { ResourcesService } from './resources.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgFeatures } from './detect-ng-features';

export class TestNgFeatures {
  ngFeatures: NgFeatures;
  constructor(private resourceService: ResourcesService) {
    this.ngFeatures = new NgFeatures(resourceService);
    this.test1();
    // this.test2(); // for testing when returning a promise
    this.test3(); // for testing when returning an observable
  }

  // Immediately call detect
  test1() {
    const mypackages = ['@angular/fire', 'apollo-client'];
    console.log('Going to detect features now on mypackages:\n', mypackages);
    this.ngFeatures.detectNgFeatures(mypackages).then(results => {
      console.log('mypackages Results outside:', results);
    });
  }

  // // Promises Way
  // test2() {
  //   this.ngFeatures.getPackages().then(npmPackages => {
  //     console.log('Going to detect features now on packages:\n', npmPackages, npmPackages.length);
  //     this.ngFeatures.detectNgFeatures(npmPackages).then(results => {
  //       console.log('Results outside:', results);
  //     });
  //   });
  // }

  // Observables Way
  test3() {
    const subscription = this.ngFeatures.getPackages().subscribe(npmPackages => {
      console.log('Going to detect features now on packages:\n', npmPackages, npmPackages.length);
      this.ngFeatures.detectNgFeatures(npmPackages).then(results => {
        console.log('Results outside:', results);
      });
      subscription.unsubscribe();
    });
  }
}

// function getPackages(): Observable<string[]> {
//   const npmPackages = [];

//   // Returning Promise<string[]>
//   return this.resourceService
//     .getAllWaitingResources()
//     .toPromise()
//     .then(resourceArray => {
//       for (const item of resourceArray) {
//         let npm = item.npm;

//         // strip npm value just down to the package name
//         if (npm != null && npm !== '' && npm !== undefined) {
//           npm = npm.replace('https://www.npmjs.com/package/', '');
//           console.log('npm = ', npm);
//           npmPackages.push(npm);
//         }
//       }
//       return npmPackages;
//     });

//   // Returning Observable<string[]>
//   return this.resourceService.getAllApprovedResources().pipe(
//     map(resourceArray => {
//       for (const item of resourceArray) {
//         let npm = item.npm;

//         // strip npm value just down to the package name
//         if (npm != null && npm !== '' && npm !== undefined) {
//           npm = npm.replace('https://www.npmjs.com/package/', '');
//           console.log('npm = ', npm);
//           npmPackages.push(npm);
//         }
//       }
//       return npmPackages;
//     })
//   );
// }
