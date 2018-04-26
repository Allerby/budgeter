import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'; 

export default Route.extend({
  session: service(),

  beforeModel: function() {
    return this.session.fetch().catch(function() {});
  },

  actions: {
    signIn: function(provider) {
      this.session.open('firebase', { provider: provider}).then(function(data) {
        console.log(data.currentUser);
      });
    },

    signOut: function() {
      this.session.close();
    }
  }
});