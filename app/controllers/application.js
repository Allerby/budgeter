import Controller from '@ember/controller';

export default Controller.extend({
  transactions: [],
  selectedBank: undefined,

  actions: {
    selectBank(bank) {
      this.set('selectedBank', bank);
      this.set('transactions', []);
    },
  },
});
