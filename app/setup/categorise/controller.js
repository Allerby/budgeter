import { action, computed } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import groupBy from 'budgeter/utils/group-by';
import _ from 'lodash';

export default class CategoriseController extends Controller {
  @service()
  currentUser;

  @computed('model')
  get uncategorisedTransactions() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }

  @computed(
    'uncategorisedTransactions',
    'uncategorisedTransactions.@each.prospective_category_id'
  )
  get groupedTransactions() {
    let transactions = groupBy(this.uncategorisedTransactions, transaction => transaction.prospective_category_id);
    let arr = _.values(transactions);
    return arr;
  }

  @action
  skipTransaction() {
    let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
    this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo }});
  }
}
