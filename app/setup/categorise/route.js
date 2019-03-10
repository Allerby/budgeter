import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  currentUser: service(),

  model() {
    // Needs to retrieve transactions where prospective category has a value and category has none
    return this.store.query('transaction', {
      user_id: this.currentUser.user.id
    });
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('currentTransactionGroup', this.paramsFor('setup').currentTransactionGroup);
    controller.set('selectCategory', this.paramsFor('setup').selectCategory);
  },

  actions: {
    queryParamsDidChange(changed) {
      this._super(...arguments);
      let controller = this.controllerFor('setup.categorise');
      if (changed.currentTransactionGroup) {
        controller.set('currentTransactionGroup', changed.currentTransactionGroup);
      }
    },
  },
});
