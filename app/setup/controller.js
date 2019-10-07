import { action, computed } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { set } from '@ember/object';
import groupBy from 'budgeter/utils/group-by';
import { map, filter, keys } from 'lodash';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { easeCubicOut } from 'd3-ease';
import { timeout } from 'ember-concurrency';

export default class SetupController extends Controller {
  @service()
  currentUser;

  @service()
  session;

  @service()
  router;

  queryParams = ['currentTransactionGroup', 'selectCategory', 'createNewTag']

  currentTransactionGroup = 0;
  selectCategory = false;
  createNewTag = false;

  *transition({ insertedSprites, removedSprites }) {
    for (let sprite of removedSprites) {
      fadeOut(sprite, { duration: 100 });
      sprite.endAtPixel({ y: sprite.initialBounds.bottom - 20 });
      move(sprite, { easing: easeCubicOut });
    }

    for (let sprite of insertedSprites) {
      yield timeout(50);
      fadeIn(sprite, { duration: 100 });
      sprite.startAtPixel({ y: sprite.finalBounds.top + 20 });
      move(sprite, { easing: easeCubicOut });
    }
  }

  @computed('model')
  get allTransactions() {
    return this.store.peekAll('transaction');
  }

  @computed('model')
  get allUploads() {
    return this.store.peekAll('csv_upload');
  }

  @computed('allUploads.[]')
  get hasCsvUploads() {
    return this.allUploads.length > 0;
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

  @computed('groupedTransactions')
  get progressPercentage() {
    let numTransactionGroups = keys(this.groupedTransactions).length;
    let percentage = Math.round(100 / numTransactionGroups);

    if (numTransactionGroups == 0 && this.allTransactions && this.allTransactions.length == 0) {
      return 0;
    } else if (numTransactionGroups == 1) {
      return 99;
    } else if (numTransactionGroups == 0 && this.allTransactions && this.allTransactions.length > 0) {
      return 100;
    } else {
      return percentage;
    }
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
