import DS from 'ember-data';
const { attr, hasMany } = DS;

export default class UserModel extends DS.Model {
  @attr() first_name
  @attr() last_name
  @attr() password
  @attr() email
  @attr() social_photo_url

  @hasMany() transactions
  @hasMany() csv_uploads
};
