import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'; 

export default Route.extend({
  firebaseSession: service(),

  beforeModel: function() {
    return this.firebaseSession.fetch().catch(function() {});
  },
});