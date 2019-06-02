import Component from '@ember/component';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param selectCategory
 */

export default Component.extend({
  classNames: 'transaction-carousel',
  transactions: null,
});
