'use strict';

module.exports = function(environment) {
  let ENV = {
    DS: {
      host: 'http://localhost:4200'
    },
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
    torii: {
      sessionServiceName: 'toriiSession',
      providers: {
        'google-oauth2': {
          tokenExchangeUri: 'http://localhost:4200/api/authenticate_with_google',
          apiKey: '531938259695-rn4u4b84glahtpimu7026eq7spd82m3g.apps.googleusercontent.com',
          redirectUri: 'http://localhost:3000/torii/redirect.html',
        }
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-simple-auth-token': {
      refreshAccessTokens: false
    }
  };

  ENV['ember-form-for'] = {
    buttonClasses: [''],
    fieldClasses: [''],
    fieldErrorClass: '',
    errorClasses: ['font-normal text-xs text-error block mt-1 text-center'],
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
    ENV.DS.host = process.env.API_HOST || 'https://gemino-api.herokuapp.com';

    ENV.torii.providers['google-oauth2'].tokenExchangeUri = 'https://gemino-api.herokuapp.com/api/authenticate_with_google';
    ENV.torii.providers['google-oauth2'].redirectUri = 'https://gemino-app.herokuapp.com/torii/redirect.html';

    // const clientHost = process.env.CLIENT_HOST || 'https://gemino-app.herokuapp.com';
    // here you can enable a production-specific feature
  }

  ENV['ember-simple-auth-token'].serverTokenEndpoint = `${ENV.DS.host}/api/session`;

  return ENV;
};
