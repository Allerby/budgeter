import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  session: service(),

  authenticate: task(function * () {
    return yield this.model.save().then(() => {
      this.transitionToRoute('welcome')
    }).catch(() => {
      this.set('errors', this.model.errors)
    });
  }),
});
