import { inject as service } from "@ember/service";
import Route from '@ember/routing/route';
import { set } from '@ember/object';

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
      return this.currentUser.load.perform();
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
    this.currentUser.load.perform().then((user) => {
      if (this.get('session.attemptedTransition')) {
        super.sessionAuthenticated(...arguments);
      } else if (this.session.previousTransition) {
        let previousTransition = this.session.previousTransition;
        this.session.set('previousTransition', null);
        previousTransition.retry();
      } else {
        if (user.selected_budget_workflow) {
          this.transitionTo('setup.upload');
        } else {
          this.transitionTo('welcome');
        }
      }
    });
    /* If a transition has been saved by AuthenticatedRouteMixin, call super to transition to it.
      Otherwise redirect to previous route saved by BaseRoute */
    
  }
}