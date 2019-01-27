import Component from '@ember/component';

export default Component.extend({
  classNames: ['pin-l pin-t absolute h-full w-full flex justify-center md:ml-24 flex-col'],

  actions: {
    closeCategories() {
      this.toggleProperty('selectCategory');
    },
  },
});
