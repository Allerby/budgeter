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
  currentTransactionGroup: null,
  selectCategory: false,
  createNewTag: false,

  allTransactions: computed('model', function() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }),

  groupedTransactions: computed('allTransactions', 'allTransactions.@each.prospective_category_id', function() {
    return groupBy(this.allTransactions, transaction => transaction.prospective_category_id);
  }),

  progressPercentage: computed('currentTransactionGroup', 'groupedTransactions', function() {
    let length = Object.keys(this.groupedTransactions).length;
    let percentage = Math.round((this.currentTransactionGroup / length) * 100)
    
    if (percentage == 100) {
      return `<i class='icon check'></i>`.htmlSafe();
    }
    return `${percentage}%`;
  }),

  currentTransactions: computed('model', 'currentTransactionGroup', function() {
    return Object.values(this.groupedTransactions)[this.currentTransactionGroup]
  }),

  actions: {
    logout(e) {
      e.preventDefault();
      this.session.invalidate();
    },
    changeCategory(category) {
      // n+1 query which could be handled on the server.. could send up transaction ids and category.
      let transactions = this.currentTransactions.map((transaction) => { 
        transaction.set('prospective_category_id', category.id);
        transaction.save();
      });
      
      Promise.all(transactions).then(() => {
        set(this, 'selectCategory', false);
      });
    },
    openTagCreate() {
      set(this, 'selectCategory', false);
      set(this, 'createNewTag', true);
    }
  },
});
