import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),

  load() {
    this.store.queryRecord('user', { me: true }).then((user) => {
      this.set('user', user);
    });
  }
});
