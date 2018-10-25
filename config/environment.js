'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'budgeter',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    firebase: {
      apiKey: 'AIzaSyDVuTl-pMh0t4JntdLK2fDRq-VvzCjLeps',
      authDomain: 'budgeter-1525e.firebaseapp.com',
      databaseURL: 'https://budgeter-1525e.firebaseio.com',
      storageBucket: '',
    },
    torii: {
      sessionServiceName: 'firebaseSession',
      providers: {
        'google': {
          redirectUri: '/',
        }
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV['ember-form-for'] = {
    buttonClasses: [''],
    fieldClasses: [''],
    fieldErrorClass: '',
    errorClasses: [''],
    hintClasses: ['font-normal text-xs text-primary-2 block mt-2 text-center'],
    inputClasses: ['border rounded-sm h-12 mt-1 text-primary-2 focus:border-primary-1 p-4 w-full'],
    labelClasses: ['font-thin text-sm block text-primary-2 mt-4'],
    resetClasses: [''],
    submitClasses: ['rounded bg-primary-1 p-3 text-white hover:btn-primary-hover transition leading-normal']
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'index',
    routeIfAlreadyAuthenticated: 'index'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
