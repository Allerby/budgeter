import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date'),
  code: DS.attr('string'),
  amount: DS.attr('number'),
  details: DS.attr('string'),
  reference: DS.attr('string'),
  particulars: DS.attr('string'),
  transaction_type: DS.attr('string'),
  prospective_category_id: DS.attr('string'),
  category_id: DS.attr('string'),
  
  prospective_category: DS.belongsTo('prospective_category'),
  category: DS.belongsTo('category'),
  csv_upload: DS.belongsTo('csv_upload'),
  user: DS.belongsTo('user'),
});
