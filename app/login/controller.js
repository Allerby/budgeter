import Controller from '@ember/controller';
import { task } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { getProperties } from '@ember/object';

export default class LoginController extends Controller {
  @service session;

  @task 
  signIn = function*() {
    let { email, password } = getProperties(this.model, 'email', 'password');
    return this.session.authenticate('authenticator:jwt', {
      email: email,
      password: password
    }).then(() => {
      this.transitionToRoute('welcome');
    }).catch((e) => {
      this.set('errors', e.json.errors);
    });
  };

 
};
