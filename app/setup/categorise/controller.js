import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import groupBy from 'budgeter/utils/group-by';
import _ from 'lodash';

export default Controller.extend({
  currentUser: service(),

  uncategorisedTransactions: computed('model', function() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }),

  groupedTransactions: computed('uncategorisedTransactions', 'uncategorisedTransactions.@each.prospective_category_id', function() {
    let transactions = groupBy(this.uncategorisedTransactions, transaction => transaction.prospective_category_id);
    let arr = _.values(transactions);
    return arr;
  }),

  actions: {
    skipTransaction() {
      let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
      this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo }});
    },
  },
});
