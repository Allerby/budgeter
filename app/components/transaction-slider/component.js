import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),

  classNames: 'transaction-carousel',
  transactions: null,

  currentGroupName: computed('currentTransactionGroup', function() {
    return Object.keys(this.transactions)[this.currentTransactionGroup];
  }),

  currentTransactions: computed('currentTransactionId', 'currentTransactionGroup', function() {
    return Object.values(this.transactions)[this.currentTransactionGroup]
  }),

  currentGroupLength: computed('currentTransactions', function() {
    return this.currentTransactions.length;
  }),

  actions: {
    tag() {
      let transactions = this.currentTransactions.map((transaction) => { 
        transaction.set('category', transaction.prospective_category);
        transaction.save();
      });
      Promise.all(transactions).then(() => {
        this.incrementProperty('currentTransactionGroup');
      });
    },
    chooseAnotherCategory() {
      this.router.transitionTo({ queryParams: { selectCategory: true }});
    },
  },
});
