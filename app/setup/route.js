import { inject as service } from "@ember/service";
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default class SetupRoute extends Route.extend(AuthenticatedRouteMixin) {
  queryParams = {
    currentTransactionGroup: {
      refreshModel: true,
      replace: true
    },
    selectCategory: {
      refreshModel: false,
      replace: true
    },
    createNewTag: {
      refreshModel: false,
      replace: true
    },
    changeToCategory: {
      refreshModel: true,
      replace: true
    },
  };

  @service()
  currentUser;

  model() {
    // Needs to retrieve transactions where prospective category has a value and category has none
    let transactions = this.store.query('transaction', {
      filter: { user_id: this.currentUser.user.id },
    });
    return hash({ transactions });
  }
}
