import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { set } from '@ember/object';

export default Controller.extend({
  currentUser: service(),
    
  selectedBank: undefined,

  init() {
    this._super(...arguments);
    set('banks', A('ANZ', 'BNZ', 'Kiwi Bank', 'ASB', 'Westpac', 'Co-operative Bank'));
  },

  actions: {
    selectBank(bank) {
      set('selectedBank', bank);
    },
    categoriseSpending() {
      this.transitionToRoute('setup.categorise');
    },
  },
});
