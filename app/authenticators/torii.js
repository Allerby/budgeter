import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default ToriiAuthenticator.extend({
  torii: service(),
  firebaseSession: service(),

  authenticate(options) {
    if (options.provider === 'google') {
      return new RSVP.Promise((resolve, reject) => {
        this.get('firebaseSession').open('firebase', { provider: options.provider }).then((authData) => {
          resolve(authData);
        });
      });
    } if (options.provider === 'password') {
      return new RSVP.Promise((resolve, reject) => {
        this.get('firebaseSession').open('firebase', options).then((authData) => {
          resolve(authData);
        });
      });
    } else {
      console.log('Authentication error');
    }
  },

  invalidate(data) {
    // Will need to unload the current identity from the store as well as kill the firebase session
    return new RSVP.Promise((resolve) => {
      // Clear the data from the store and session
      return resolve(data);
    }, (error) => {
      console.log('invalidate:', error);
    });
  },
  
  restore(data) {
    return new RSVP.Promise((resolve) => {
      return resolve(data);
    }, (error) => {
      console.log('invalidate:', error);
    });
  },
});