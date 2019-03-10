import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  currentUser: service(),
  selectedBank: undefined,

  init() {
    this._super(...arguments);
    set(this, 'banks', A(['ANZ', 'BNZ', 'Kiwi Bank', 'ASB', 'Westpac', 'Co-operative Bank']));
  },

  uploads: alias('allUploads.[]'),

  actions: {
    selectBank(bank) {
      set(this, 'selectedBank', bank);
    },
    categoriseSpending() {
      this.transitionToRoute('setup.categorise');
    },
  },
});
