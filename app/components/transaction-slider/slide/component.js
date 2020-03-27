import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from '@ember/component';
import { map } from 'lodash';
import { task } from 'ember-concurrency-decorators';
import { iconMap } from 'budgeter/helpers/icon-map';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param slideIndex
 */

@classNames('transaction-carousel-slide')
export default class TransactionSlide extends Component {
  @service()
  router;

  @service()
  store;

  @service()
  categories;

  transactions = null;

  @computed('currentTransactionGroup', 'slideIndex')
  get isCurrentSlide() {
    return this.slideIndex == this.currentTransactionGroup
  }

  @computed('changeToCategory', 'transactions.@each.prospective_category_id')
  get currentCategory() {
    let categoryId = this.changeToCategory ? this.changeToCategory : this.transactions[0].prospective_category_id;
    console.log('update', categoryId);
    return this.store.peekRecord('category', categoryId);
  }

  @computed('transactions')
  get currentGroupLength() {
    return this.transactions.length;
  }

  @computed('transactions')
  get currentGroupDetails() {
    return this.transactions[0].details;
  }

  @computed('transactions', 'currentTransactionGroup', 'currentCategory')
  get icon() {
    if (this.currentCategory) {
      if (this.currentCategory.user_id === null) {
        return iconMap(this.currentCategory.name);
      } else {
        this.currentCategory.get('parent_category').then((parent_category) => {
          console.log('parentCategory', parent_category);
          return iconMap(parent_category.name);
        });
      }
    };
  }

  @task
  tag = function* () {
    let transaction_ids = map(this.transactions, 'id');
    yield this.store.updateCategory.perform(transaction_ids, this.currentCategory);
    //TODO: We currently have a bug where the category won't reset...
    this.router.transitionTo({ queryParams: { changeToCategory: null } });
  }

  @action
  showTransactionsForGroup() {
    const groupProspectiveCategoryId = this.transactions[0].prospective_category_id;
    this.router.transitionTo({ queryParams: { viewTransactions: groupProspectiveCategoryId } })
  }

  @action
  chooseAnotherCategory() {
    this.router.transitionTo({ queryParams: { selectCategory: true } });
  }
}
