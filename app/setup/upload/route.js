import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  model() {
    return this.store.query('csv-upload', {
      filter: {
        user_id: this.currentUser.user.id,
      },
      include: 'transactions'
    });
  },

  setupController(controller) {
    const uploads = this.store.peekAll('csv-upload');
    set(controller, 'allUploads', uploads);
  },
});
