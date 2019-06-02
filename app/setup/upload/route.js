import { inject as service } from "@ember/service";
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class UploadRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service()
  currentUser;

  model() {
    return this.store.query('csv-upload', {
      filter: {
        user_id: this.currentUser.user.id,
      },
      include: 'transactions'
    });
  }

  setupController(controller) {
    const uploads = this.store.peekAll('csv-upload');
    set(controller, 'allUploads', uploads);
  }
}
