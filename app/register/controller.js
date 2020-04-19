import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { set } from '@ember/object';

export default class RegisterController extends Controller {
  @service 
  session;

  @service 
  currentUser;

  @task
  authenticate = function* () {
    try {
      let user = yield this.model.save();

      yield this.session.authenticate('authenticator:jwt', {
        email: user.email,
        password: user.password
      });

    } catch (errors) {
      set(this, 'errors', errors);
    }
  };
};
