import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

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

  *transition({ insertedSprites, removedSprites }) {
    // Remember: Motions are promises.
    for (let sprite of insertedSprites) {
      fadeIn(sprite, { duration: 200 });
      sprite.applyStyles({ 'left': 0 });
      sprite.startAtPixel({ y: sprite.finalBounds.top + 20 });
      move(sprite, { easing: easeIn });
    }
    
    for (let sprite of removedSprites) {
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
    // n+1 query
    let transactions = this.transactions.map((transaction) => { 
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
