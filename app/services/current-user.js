import Service, { inject as service } from "@ember/service";

export default class CurrentUser extends Service {
  @service()
  store;

  load() {
    return this.store.queryRecord('user', { me: true }).then((user) => {
      this.set('user', user);
    });
  }
}
