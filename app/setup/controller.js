import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import controller from '../welcome/controller';

export default Controller.extend({
  currentUser: service(),

  queryParams: {
    currentTransactionId: {
      refreshModel: true,
    },
    currentTransactionGroup: {
      refreshModel: true,
    },
    selectCategory: {
      refreshModel: false,
    },
  },

  currentTransactionId: 0,
  currentTransactionGroup: 0,
  selectCategory: false,

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

  groupedTransactions: computed('uncategorisedTransactions', function() {
    return this.groupBy(this.uncategorisedTransactions, transaction => transaction.prospective_category);
  }),

  groupBy(list, keyGetter) {
    let obj = Object.create(null);
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = obj[key];
      if (!collection) {
        obj[key] = [item]
      } else {
        collection.push(item);
      }
    });
    return obj;
  },
});
