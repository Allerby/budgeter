import Service, { inject as service } from "@ember/service";
import { task } from 'ember-concurrency-decorators';

export default class CurrentUser extends Service {
  @service()
  store;

  @task
  load = function*() {
    let user = yield this.store.queryRecord('user', { me: true });
    this.set('user', user);
    return user;
  }
}
