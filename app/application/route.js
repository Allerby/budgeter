import { inject as service } from "@ember/service";
import Route from '@ember/routing/route'; 
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
  @service()
  currentUser;

  @service()
  categories;

  @service()
  session;

  beforeModel() {
    if (this.session.isAuthenticated) {
      return this.currentUser.load();
    }
  }

  model() {
    return this.store.findAll('category');
  }

  afterModel(resolvedModel) {
    this.categories.set('allCategories', resolvedModel);
  }

  sessionInvalidated() {
    window.location.replace('/login');
  }

  sessionAuthenticated() {
    this.currentUser.load();
    /* If a transition has been saved by AuthenticatedRouteMixin, call super to transition to it.
      Otherwise redirect to previous route saved by BaseRoute */
    if (this.get('session.attemptedTransition')) {
      super.sessionAuthenticated(...arguments);
    } else if (this.session.previousTransition) {
      let previousTransition = this.session.previousTransition;
      this.session.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionTo('welcome');
    }
  }
}