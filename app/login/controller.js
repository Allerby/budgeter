import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  signIn: task(function * (provider) {
    yield this.get('session').authenticate('authenticator:torii', provider).catch((reason) => {
      this.set('errorMessage', reason.error || reason);
    });
  }),
});
