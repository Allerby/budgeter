import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  code: DS.attr('string'),
  amount: DS.attr('number'),
  details: DS.attr('string'),
  reference: DS.attr('string'),
  particulars: DS.attr('string'),
  transaction_type: DS.attr('string'),
  category: DS.attr('string'),
  prospective_category: DS.attr('string'),

  user: DS.belongsTo('user'),
  csv_upload: DS.belongsTo('csv_upload'),
});
