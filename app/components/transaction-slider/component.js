import { classNames } from "@ember-decorators/component";
import Component from '@ember/component';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param selectCategory
 */

@classNames('transaction-carousel')
export default class TransactionSlider extends Component {
 transactions = null;
}
