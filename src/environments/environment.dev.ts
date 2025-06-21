// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  envName: 'LOCAL',
  baseHref: '',

  baseUrl: 'https://classifiedwebapi.azurewebsites.net',
  portalBaseUrl: 'http://classifiedportal.azurewebsites.net',
  portalLoginUrl: 'http://localhost:4200/#/portal/login',
  portalUrl: 'http://localhost:4200/#/portal/home',
  unlockUrl: 'http://localhost:4200/#/portal/unlock-page', 
  paymentUrl: 'http://localhost:4200/#/payment',
  googleMapsApiKey: 'AIzaSyDyAgMalZGKh5RuVvbJrH9jIPMjToZYm3o' 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
