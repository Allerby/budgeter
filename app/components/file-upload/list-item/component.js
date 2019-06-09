import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: service(),

  deleteCsvUpload: task(function* () {
    // For some reason, when I request the transactions by the relationship, half of them are undefined even if I yield..
    this.store.peekAll('transaction').
               filterBy('csv_upload_id', this.csv.id).
               map(transaction => this.store.unloadRecord(transaction));
    return yield this.csv.destroyRecord();
  }),

});
