import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    upload(event) {
      const file = event.target.files[0];

      Papa.parse(file, { // eslint-disable-line
        header: true,
        complete: (results) => {
          this.set('myData', results);
        }
      });
    }
  }
});
