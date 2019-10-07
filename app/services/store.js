import DS from 'ember-data';
import fetch from 'fetch';
import ENV from 'budgeter/config/environment';
import { inject as service } from '@ember/service';
import { task, all } from 'ember-concurrency';

export default DS.Store.extend({
  store: service(),

  batchCreate(arrayOfObjects, options) {
    return this.adapterFor('batch-request').batchCreate(arrayOfObjects, options);
  },

  batchUpdate(arrayOfObjects, options) {
    return this.adapterFor('batch-request').batchUpdate(arrayOfObjects, options);
  },

  batchDelete(arrayOfObjects) {
    return this.adapterFor('batch-request').batchDelete(arrayOfObjects);
  },

  updateCategory: task(function* (arrayOfObjects, category) {
    let formData = new FormData();
    formData.append('transactions', arrayOfObjects);
    formData.append('new_category', category.name);

    const options = {
      method: 'POST',
      body: formData
    };

    return all([
      fetch(`${ENV.DS.host}/api/update_category`, options).then((response) => {
        response
          .json()
          .then((results) => {
            this.store.pushPayload(results);
          });
      }),
    ]);
  }),
});