import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  signIn: task(function * (provider) {
    let data = yield this.firebaseSession.open('firebase', {
      provider: provider,
    });
    this.transitionToRoute('index');
  }),
});
