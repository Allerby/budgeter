import Component from '@ember/component';

export default Component.extend({
  classNames: ['pin-l pin-t absolute h-full w-full flex justify-center md:ml-24 flex-col'],

  actions: {
    selectCategory(category) {
      if (category == this.selectedCategory) {
        this.set('selectedCategory', undefined);
      } else {
        this.set('selectedCategory', category)
      }
    },

    closeCategories() {
      this.toggleProperty('selectCategory');
    },
  },
});
