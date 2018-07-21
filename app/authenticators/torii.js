import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default ToriiAuthenticator.extend({
  torii: service(),
  firebaseSession: service(),

  authenticate(provider, options) {
    if (provider === 'google') {
      return new RSVP.Promise((resolve, reject) => {
        this.get('firebaseSession').open('firebase', { provider: 'google' }).then((authData) => {
          resolve(authData);
        });
      });
    } else {
      reject('Authentication error');
    }
  },
});