import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  user: DS.belongsTo('user'),
  user_id: DS.attr('string'),
  parent_category_id: DS.attr('string'),
  parent_category: DS.belongsTo('category'),
});
