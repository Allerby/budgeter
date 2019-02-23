import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed, set } from '@ember/object';
import groupBy from 'budgeter/utils/group-by';

export default Controller.extend({
  currentUser: service(),
  session: service(),

  queryParams: {
    currentTransactionGroup: {
      refreshModel: true,
    },
    selectCategory: {
      refreshModel: false,
    },
    createNewTag: {
      refreshModel: false,
    },
  },

  currentTransactionId: 0,
  currentTransactionGroup: 0,
  selectCategory: false,
  createNewTag: false,

  uncategorisedTransactions: computed('model', function() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }),

  progressPercentage: computed('uncategorisedTransactions', 'currentTransactionGroup', 'groupedTransactions', function() {
    let length = Object.keys(this.groupedTransactions).length;
    let percentage = Math.round((this.currentTransactionGroup / length) * 100)
    
    if (percentage == 100) {
      return `<i class="icon check"></i>`.htmlSafe();
    }
    return `${percentage}%`;
  }),

  groupedTransactions: computed('uncategorisedTransactions', 'uncategorisedTransactions.@each.prospective_category', function() {
    let transactions = groupBy(this.uncategorisedTransactions, transaction => transaction.prospective_category);
    return transactions;
  }),

  // This code is almost duplicated in transaction slide component. Need to define this up higher.
  currentTransactions: computed('model', 'currentTransactionGroup', function() {
    return Object.values(this.groupedTransactions)[this.currentTransactionGroup]
  }),

  actions: {
    logout(e) {
      e.preventDefault();
      this.session.invalidate();
    },
    changeCategory(category) {
      let transactions = this.currentTransactions.map((transaction) => { 
        transaction.set('prospective_category', category);
        transaction.save();
      });
      
      Promise.all(transactions).then(() => {
        set('selectCategory', false);
      });
    },
    openTagCreate() {
      set('selectCategory', false);
      set('createNewTag', true);
    }
  },
});
