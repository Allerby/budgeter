import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Route from '@ember/routing/route';

export default class CategoriseRoute extends Route {
  @service()
  currentUser;

  model() {
    // Needs to retrieve transactions where prospective category has a value and category has none
    return this.store.query('transaction', {
      filter: {
        user_id: this.currentUser.user.id,
      },
    });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.set('currentTransactionGroup', this.paramsFor('setup').currentTransactionGroup);
    controller.set('selectCategory', this.paramsFor('setup').selectCategory);
  }

  @action
  queryParamsDidChange(changed) {
    // TODO: This call to super is within an action, and has to refer to the parent
    // class's actions to be safe. This should be refactored to call a normal method
    // on the parent class. If the parent class has not been converted to native
    // classes, it may need to be refactored as well. See
    // https: //github.com/scalvert/ember-es6-class-codemod/blob/master/README.md
    // for more details.
    super.actions.queryParamsDidChange.call(this, ...arguments);
    let controller = this.controllerFor('setup.categorise');
    if (changed.currentTransactionGroup) {
      controller.set('currentTransactionGroup', changed.currentTransactionGroup);
    }
  }
}
