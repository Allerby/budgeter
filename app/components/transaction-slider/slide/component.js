import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from '@ember/component';
import { wait } from 'ember-animated';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';
import { adjustCSS } from 'ember-animated/motions/adjust-css';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param selectCategory
 *  @param changeCategory
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

  *transition({ insertedSprites, removedSprites }) {
    for (let sprite of insertedSprites) {
      console.log('insertedSprite:', sprite);
      fadeIn(sprite);
      sprite.applyStyles({ 'left': 0 });
      sprite.startAtPixel({ y: sprite.finalBounds.top + 20 });
      move(sprite, { easing: easeIn });
    }
    
    for (let sprite of removedSprites) {
      console.log('removedSprite:', sprite);
      fadeOut(sprite);
      sprite.applyStyles({ 'left': 0 });
      sprite.endAtPixel({ y: sprite.initialBounds.height });
      move(sprite, { easing: easeOut });
    }
  }

  @computed('slideIndex', 'currentTransactionGroup')
  get isCurrentSlide() {
    return String(this.slideIndex) == this.currentTransactionGroup;
  }

  @computed('transactions.@each.prospective_category_id', 'currentGroupId')
  get currentCategory() {
    return this.store.peekRecord('category', this.transactions[0].prospective_category_id);
  }

  @computed('currentTransactions')
  get currentGroupLength() {
    return this.transactions.length;
  }

  @computed('currentTransactions')
  get currentGroupDetails() {
    return this.transactions[0].details;
  }

  @computed('transactions', 'currentTransactionGroup')
  get icon() {
    if (this.currentCategory) {
      if (this.currentCategory.user_id === null) {
        return this.categories.iconMap(this.currentCategory.name);
      } else {
        currentCategory.get('parent_category').then((parent_category) => {
          return this.categories.iconMap(parent_category.name);
        });
      }
    };
  }

  @action
  tag() {
    let transactions = this.currentTransactions.map((transaction) => { 
      transaction.set('category', this.currentCategory);
      transaction.save();
    });
    Promise.all(transactions).then(() => {
      this.incrementProperty('currentTransactionGroup');
    });
  }

  @action
  chooseAnotherCategory() {
    this.router.transitionTo({ queryParams: { selectCategory: true }});
  }
}
