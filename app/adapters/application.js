import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import config from 'budgeter/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(DataAdapterMixin) {
  @service 
  session;

  host = config.DS.host;
  namespace = 'api';

  @computed('session.data.authenticated.token')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.token}`;
    }
    return headers;
  }
}
