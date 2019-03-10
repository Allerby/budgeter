import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import groupBy from 'budgeter/utils/group-by';

export default Controller.extend({
  currentUser: service(),

  uncategorisedTransactions: computed('model', function() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }),

  groupedTransactions: computed('uncategorisedTransactions', 'uncategorisedTransactions.@each.prospective_category', function() {
    let transactions = groupBy(this.uncategorisedTransactions, transaction => transaction.prospective_category);
    return transactions;
  }),

  actions: {
    skipTransaction() {
      let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
      this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo }});
    },
  },
});
