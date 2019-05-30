import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object'; 

export default Component.extend({
  categories: service(),
  tagName: '',

  icon: computed('name', function() {
    return this.categories.iconMap(this.categoryName);
  }),
});
