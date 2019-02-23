import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  model() {
    // Needs to retrieve transactions where prospective category has a value and category has none
    return this.store.query('transaction', {
      user_id: 1,
    });
  },
});
