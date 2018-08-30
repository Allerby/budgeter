import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  signIn: task(function * () {
    let { email, password } = this.model.getProperties('email', 'password');

    return yield this.session.authenticate('authenticator:application', {
      'provider': 'password',
      'email': email,
      'password': password,
    }).catch((error) => {
      if (error.code === 'auth/wrong-password') {
        this.set('error', 'sign_in.incorrect_password');
      } else if (error.code === 'auth/user-not-found') {
        this.set('error', 'sign_in.incorrect_email');
      } else {
        this.set('error', error.code);
      }
    });
  }),
});
