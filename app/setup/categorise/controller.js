import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  firebaseSession: service(),
  currentUser: service(),

  actions: {
    skipTransaction() {
      let transactionGroupNo = this.incrementProperty('currentTransactionGroup');
      this.transitionToRoute({ queryParams: { currentTransactionGroup: transactionGroupNo }});
    },
  },
});
