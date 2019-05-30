import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { wait } from 'ember-animated';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { parallel } from 'ember-animated';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param selectCategory
 *  @param changeCategory
 */

export default Component.extend({
  router: service(),
  store: service(),
  categories: service(),

  classNames: 'transaction-carousel-slide',
  transactions: null,
  
  transition: function * ({ insertedSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      wait(200);
      fadeIn(sprite);
      console.log('inserted', sprite);
    });

    removedSprites.forEach(sprite => {
      fadeOut(sprite);
      console.log('removed', sprite);
    });
  },

  currentCategory: computed('transactions.@each.prospective_category_id', 'currentGroupId', function() {
    // console.log('currentGroupId', this.currentGroupId);
    return this.store.peekRecord('category', this.transactions[0].prospective_category_id);
  }),

  currentGroupId: computed('transactions', 'currentTransactionGroup', function() {
    // set(this, 'isShowing', true);
    // return Object.keys(this.transactions)[this.currentTransactionGroup];
  }),

  currentTransactions: computed('transactions', 'currentTransactionGroup', function() {
    // return Object.values(this.transactions)[this.currentTransactionGroup]
  }),

  currentGroupLength: computed('currentTransactions', function() {
    // return this.currentTransactions.length;
  }),

  currentGroupDetails: computed('currentTransactions', function() {
    // return this.currentTransactions[0].details;
  }),

  icon: computed('transactions', 'currentTransactionGroup', function() {
    // if (this.currentCategory) {
    //   if (this.currentCategory.user_id === null) {
    //     return this.categories.iconMap(this.currentCategory.name);
    //   } else {
    //     currentCategory.get('parent_category').then((parent_category) => {
    //       return this.categories.iconMap(parent_category.name);
    //     });
    //   }
    // };
  }),

  actions: {
    tag() {
      // let transactions = this.currentTransactions.map((transaction) => { 
      //   transaction.set('category', this.currentCategory);
      //   transaction.save();
      // });
      // Promise.all(transactions).then(() => {
      //   this.incrementProperty('currentTransactionGroup');
      // });
    },
    chooseAnotherCategory() {
      // this.router.transitionTo({ queryParams: { selectCategory: true }});
    },
  },
});
