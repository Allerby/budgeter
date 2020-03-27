import Controller from "@ember/controller";
import { task } from "ember-concurrency-decorators"
import { inject as service } from "@ember/service";
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class WelcomeController extends Controller {
  @service()
  session;

  @service()
  currentUser;

  queryParams = ['option'];
  option = null;

  @task
  saveSelectedBudgetWorkflow = function*() {
    set(this.currentUser.user, 'selected_budget_workflow', this.option);
    return yield this.currentUser.user.save();
  }

  @action
  confirmSelection() {
    this.saveSelectedBudgetWorkflow.perform();
    this.transitionToRoute('setup.upload')
  }
}