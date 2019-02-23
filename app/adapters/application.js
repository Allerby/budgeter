import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  session: service(),
  host: config.DS.host,

  namespace: 'api',

  headers: computed(function() {
    if (this.session.isAuthenticated) {
      return {
        Authorization: `Bearer ${this.session.data.authenticated.token}`
      };
    }
    return {}
  }),
});
