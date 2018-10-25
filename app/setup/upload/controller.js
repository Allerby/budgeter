import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  currentUser: service(),
    
  selectedBank: undefined,
  banks: ['ANZ', 'BNZ', 'Kiwi Bank', 'ASB', 'Westpac', 'Co-operative Bank'],

  actions: {
    selectBank(bank) {
      this.set('selectedBank', bank);
    },
    categoriseSpending() {
      this.transitionToRoute('setup.categorise');
    },
  },
});
