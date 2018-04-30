import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebaseSession: service(),
  router: service(),

  actions: {
    signOut: function() {
      this.firebaseSession.close();
      this.router.transitionTo('login');
    },
  },
});
