import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  router: service(),

  actions: {
    signOut: function() {
      this.session.close();
      this.router.transitionTo('login');
    },
  },
});
