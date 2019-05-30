import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

/**
 *  Component parameters
 *  @param changeCategory
 */

export default Component.extend({
  currentUser: service(),
  categories: service(),
  router: service(),
  store: service(),

  classNames: ['pin-l pin-t absolute h-full w-full flex justify-center md:ml-24 flex-col'],

  createNewCategory: task(function* () {
    let category = yield this.store.createRecord('category', {
      parent_category: this.selectedCategory,
      user: this.currentUser.user,
      name: this.tagName,
    }).save();

    this.changeCategory(category.name);

    return this.router.transitionTo({ 
      queryParams: { 
        selectCategory: true,
        createNewTag: false 
      }
    });
  }),

  actions: {
    selectCategory(category) {
      if (category == this.selectedCategory) {
        this.set('selectedCategory', undefined);
      } else {
        this.set('selectedCategory', category)
      }
    },
    closeModal() {
      this.router.transitionTo({ queryParams: { createNewTag: false } })
    },
  },
});
