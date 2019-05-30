import DS from 'ember-data';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default DS.Model.extend({
  categories: service(),

  name: DS.attr('string'),

  user: DS.belongsTo('user'),
  user_id: DS.attr('string'),
  parent_category_id: DS.attr('string'),
  parent_category: DS.belongsTo('category'),
  transactions: DS.hasMany('transaction'),

  children: computed(function() {
    return this.categories.allCategories.filterBy('parent_category_id', this.id);
  }),
});
