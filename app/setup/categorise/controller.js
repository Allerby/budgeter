import { computed } from "@ember/object";
import { task } from 'ember-concurrency-decorators';
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import groupBy from 'budgeter/utils/group-by';
import { map, filter } from 'lodash';

export default class CategoriseController extends Controller {
  @service()
  currentUser;

  @computed('model')
  get allTransactions() {
    return this.store.peekAll('transaction');
  }

  @computed('allTransactions.@each.category_id')
  get uncategorisedTransactions() {
    return filter(this.allTransactions.toArray(), (transaction) => {
      return transaction.category_id == null;
    });
  }

  @computed('uncategorisedTransactions.[]')
  get groupedTransactions() {
    return map(groupBy(this.uncategorisedTransactions, (transaction) => transaction.prospective_category_id));
  }

  @task
  skipTransaction = function* () {
    let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
    yield this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo } });
  }
}
