import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),

  deleteCsvUpload: task(function * () {
    let transactions = yield this.csv.transactions;
    // For some reason I cannot unload the transactions after destroying the record..
    yield transactions.forEach((transaction) => {
      this.store.unloadRecord(transaction);
    });
    return yield this.csv.destroyRecord();
  }),

});
