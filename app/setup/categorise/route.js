import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Route from '@ember/routing/route';
import { set } from '@ember/object';

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
    set(controller, 'currentTransactionGroup', this.paramsFor('setup').currentTransactionGroup);
    set(controller, 'selectCategory', this.paramsFor('setup').selectCategory);
    set(controller, 'viewTransactions', this.paramsFor('setup').viewTransactions);
  }

  @action
  queryParamsDidChange(changed) {
    console.log('queryParamsDidChange', changed);
    // TODO: This call to super is within an action, and has to refer to the parent
    // class's actions to be safe. This should be refactored to call a normal method
    // on the parent class. If the parent class has not been converted to native
    // classes, it may need to be refactored as well. See
    // https: //github.com/scalvert/ember-es6-class-codemod/blob/master/README.md
    // for more details.
    // super.actions.queryParamsDidChange.call(this, ...arguments);
    let controller = this.controllerFor('setup.categorise');
    if (changed.currentTransactionGroup) {
      set(controller, 'currentTransactionGroup', changed.currentTransactionGroup);
    }
    //TODO: We currently have a bug where the category won't reset...
    set(controller, 'changeToCategory', changed.changeToCategory);
  }
}
