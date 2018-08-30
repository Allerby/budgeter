import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),
  
  classNames: 'text-primary-2 relative leading-normal rounded border p-3 w-3/5',
  tagName: 'button',

  click() {
    if (this.type === 'login') {
      this.get('signInWithGoogle').perform('google');
    } else if (this.type === 'register') {
      debugger;
    }
  },

  signInWithGoogle: task(function * (provider) {
    return yield this.session.authenticate('authenticator:torii', provider).catch((reason) => {
      console.log('errorMessage', reason);
    });
  }),
});
