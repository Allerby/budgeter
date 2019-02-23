import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
import { inject as service } from '@ember/service';
import RSVP, { reject } from 'rsvp';

export default ToriiAuthenticator.extend({
  torii: service(),

  authenticate(data) {
    if (data.provider === 'google') {
      return new RSVP.Promise((resolve) => {
        return resolve(data);
      }, () => {
        return reject(data);
      });
    }
  },

  invalidate(data) {
    return new RSVP.Promise((resolve) => {
      return resolve(data);
    }, () => {
      return reject(data);
    });
  },
  
  restore(data) {
    return new RSVP.Promise((resolve) => {
      return resolve(data);
    }, () => {
      return reject(data);
    });
  },
});