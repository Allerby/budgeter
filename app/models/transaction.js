import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  date: DS.attr('date'),
  particulars: DS.attr('string'),
  reference: DS.attr('string'),
  details: DS.attr('string'),
  code: DS.attr('string'),
  transaction_type: DS.attr('string'),

  user: DS.belongsTo('user'),
  user: DS.belongsTo('csv_upload'),
});
