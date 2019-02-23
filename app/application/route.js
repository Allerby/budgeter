import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'; 
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  firebaseSession: service(),
  currentUser: service(),
  session: service(),

  beforeModel() {
    this._super(...arguments);
    if (this.session.isAuthenticated) {
      this.currentUser.load();
    }
  },

  sessionInvalidated() {
    window.location.replace('/login');
  },

  sessionAuthenticated() {
    this.currentUser.load();
    /* If a transition has been saved by AuthenticatedRouteMixin, call super to transition to it.
      Otherwise redirect to previous route saved by BaseRoute */
    if (this.get('session.attemptedTransition')) {
      this._super(...arguments);
    } else if (this.session.previousTransition) {
      let previousTransition = this.session.previousTransition;
      this.session.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionTo('setup.upload');
    }
  },
});