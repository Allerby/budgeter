import { action } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";
import { A } from '@ember/array';
import { set } from '@ember/object';

export default class UploadController extends Controller {
  @service()
  currentUser;

  selectedBank = undefined;

  init() {
    super.init(...arguments);
    set(this, 'banks', A(['ANZ', 'BNZ', 'Kiwi Bank', 'ASB', 'Westpac', 'Co-operative Bank']));
  }

  @alias('allUploads.[]')
  uploads;

  @action
  selectBank(bank) {
    set(this, 'selectedBank', bank);
  }

  @action
  categoriseSpending() {
    this.transitionToRoute('setup.categorise', { queryParams: { currentTransactionGroup: 0 }});
  }
}
