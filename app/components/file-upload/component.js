import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  upload: task(function * (event) {
    const file = event.target.files[0];
    yield Papa.parse(file, { // eslint-disable-line
      header: true,
      beforeFirstChunk: (chunk) => {
        if (this.selectedBank === 'asb') {
          let start = chunk.search('Date,');
          return chunk.slice(start, chunk.length);
        }
      },
      complete: (results) => {
        console.log(results);
        this.set('transactions', results);
      }
    });
  }),
});
