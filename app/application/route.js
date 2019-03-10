import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'; 
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  currentUser: service(),
  session: service(),

  beforeModel() {
    if (this.session.isAuthenticated) {
      return this.currentUser.load();
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
      this.transitionTo('welcome');
    }
  },
});