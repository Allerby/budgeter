import DS from 'ember-data';

export default DS.Model.extend({
  bank: DS.attr('string'),
  filename: DS.attr('string'),
  created_at: DS.attr('string'),

  user: DS.belongsTo('user'),
  transactions: DS.hasMany('transaction'),
});
