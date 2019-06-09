import { action, computed } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { set } from '@ember/object';
import groupBy from 'budgeter/utils/group-by';

export default class SetupController extends Controller {
  @service()
  currentUser;

  @service()
  session;

  queryParams = ['currentTransactionGroup', 'selectCategory', 'createNewTag']

  currentTransactionGroup = 0;
  selectCategory = false;
  createNewTag = false;

  @computed('model')
  get allTransactions() {
    // Will need to filter by current user id
    return this.store.peekAll('transaction');
  }

  @computed('allTransactions', 'allTransactions.@each.prospective_category_id')
  get groupedTransactions() {
    return groupBy(this.allTransactions, transaction => transaction.prospective_category_id);
  }

  @computed('currentTransactionGroup', 'groupedTransactions')
  get progressPercentage() {
    let length = Object.keys(this.groupedTransactions).length;
    let percentage = Math.round((this.currentTransactionGroup / length) * 100)
    
    if (percentage == 100) {
      return `<i class='icon check'></i>`.htmlSafe();
    }
    return `${percentage}%`;
  }

  @computed('model', 'currentTransactionGroup')
  get currentTransactions() {
    return Object.values(this.groupedTransactions)[this.currentTransactionGroup]
  }

  @action
  logout(e) {
    e.preventDefault();
    this.session.invalidate();
  }

  @action
  changeCategory(category) {
    // n+1 query which could be handled on the server.. could send up transaction ids and category.
    let transactions = this.currentTransactions.map((transaction) => { 
      transaction.set('prospective_category_id', category.id);
      transaction.save();
    });
    
    Promise.all(transactions).then(() => {
      set(this, 'selectCategory', false);
    });
  }

  @action
  openTagCreate() {
    set(this, 'selectCategory', false);
    set(this, 'createNewTag', true);
  }
}
