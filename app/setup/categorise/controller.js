import { action, computed } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import groupBy from 'budgeter/utils/group-by';
import { values, reject } from 'lodash';
import { task } from 'ember-concurrency-decorators'

export default class CategoriseController extends Controller {
  @service()
  currentUser;

  @task
  uncategorisedTransactions = function*() {
    let allTransactions = yield this.store.peekAll('transaction');
    let groupedTransactions = groupBy(allTransactions, transaction => transaction.prospective_category_id);
    return values(reject(groupedTransactions, transaction => transaction.category_id));
  }

  @computed('model')
  get groupedTransactions() {
    return this.uncategorisedTransactions.perform();
  }

  @action
  skipTransaction() {
    let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
    this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo }});
  }
}
