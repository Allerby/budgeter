import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  firebaseSession: service(),
  router: service(),
  session: service(),

  actions: {
    signOut: function() {
      this.get('session').invalidate();
      this.firebaseSession.close();
      this.router.transitionTo('login');
    },
  },
});
