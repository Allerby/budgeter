import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  actions: {
    signIn: function(provider) {
      this.session.open('firebase', { provider: provider}).then((data) => {
        console.log(data.currentUser);
        this.transitionTo('index');
      });
    },
  }
});
