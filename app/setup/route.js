import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    // Needs to retrieve transactions where prospective category has a value and category has none
    let transactions = this.store.query('transaction', {
      filter: { 
        user_id: this.currentUser.user.id 
      },
    });

    return hash({ transactions });
  },
});
