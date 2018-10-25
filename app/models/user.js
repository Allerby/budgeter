import DS from 'ember-data';

export default DS.Model.extend({
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  password: DS.attr('string'),
  email: DS.attr('string'),
  user_id: DS.attr('string'),
  social_photo_url: DS.attr('string'),

  transactions: DS.hasMany('transaction'),
  csv_uploads: DS.hasMany('csv_upload'),
});
