import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { getProperties } from '@ember/object';

export default Controller.extend({
  firebaseApp: service(),

  authenticate: task(function * () {
    let { email, password } = getProperties(this.model, 'email', 'password');
    const auth = this.get('firebaseApp').auth();
    
    try {
      let firebaseUser = yield auth.createUserWithEmailAndPassword(email, password);
      firebaseUser.sendEmailVerification();
      return firebaseUser;
    } catch(error) {
      if (error.code === 'auth/email-already-in-use') {
        this.set('error', 'This email address is already in use - Try logging in!');
      } else if (error.code === 'auth/weak-password') {
        this.set('error', 'Password must be 8 characters');
      } else {  
        this.set('error', error.code);
      }
    }
  }),
});
