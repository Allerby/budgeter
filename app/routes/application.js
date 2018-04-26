import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'; 

export default Route.extend({
  session: service(),

  beforeModel: function() {
    if (!this.session.isAuthenticated) {
      this.transitionTo('login');
    }
    return this.session.fetch().catch(function() {});
  },
});