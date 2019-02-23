import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { getProperties } from '@ember/object';

export default Controller.extend({
  session: service(),

  signIn: task(function * () {
    let { email, password } = getProperties(this.model, 'email', 'password');
    
    return yield this.session.authenticate('authenticator:jwt', {
      email: email,
      password: password
    }).then(() => {
      this.transitionToRoute('welcome');
    }).catch((e) => {
      this.set('errors', e.json.errors);
    });
  }),
});
