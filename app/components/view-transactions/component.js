import Component from '@ember/component';
import { action } from "@ember/object";
import { classNames } from "@ember-decorators/component";
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { without, includes } from 'lodash';

@classNames('left-0 top-0 absolute h-full w-full flex justify-center md:ml-24 flex-col')

export default class ViewTransactions extends Component {
  @service router;
  @tracked selectedTransactions = [];

  init() {
    super.init(...arguments)
    this.selectedTransactions = this.transactions;
  }

  @action
  selectTransaction(transaction) {
    if (includes(this.selectedTransactions, transaction)) {
      this.selectedTransactions = without(this.selectedTransactions, transaction);
    } else {
      this.selectedTransactions = [...this.selectedTransactions, transaction];
    }

  }

  @action
  deselectAll() {
    this.selectedTransactions = [];
  }

  @action
  close() {
    this.router.transitionTo({ queryParams: { viewTransactions: null } });
  }
}
