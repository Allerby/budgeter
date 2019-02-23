import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default Component.extend({
  currentUser: service(),
  store: service(),

  classNames: [''],
  multiple: true,
  type: 'file',

  change() {
    this._super(...arguments);
    this.upload.perform(...arguments);
  },

  upload: task(function * (event) {
    const csv = event.target.files[0];

    let formData = new FormData();
    formData.append('file', csv);
    formData.append('bank', this.selectedBank);

    let options = {
      method: 'POST',
      body: formData
    };

    yield fetch('/api/users/1/transactions/upload_transactions', options).then((response) => {
      response
        .json()
        .then((results) => {
          this.store.pushPayload(results);
        });
    });
  }),
});
