import { action } from "@ember/object";
import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";
import { A } from '@ember/array';
import { set } from '@ember/object';
import { fadeOut } from 'ember-animated/motions/opacity';
import move from 'ember-animated/motions/move';

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

  * transition({ duration, removedSprites, keptSprites }) {
    for (let sprite of removedSprites) {
      fadeOut(sprite, { duration: duration * (1/4) });
    }

    for (let sprite of keptSprites) {
      move(sprite, { duration: duration * (3/4) });
    }
  }

  @action
  categoriseSpending() {
    this.transitionToRoute('setup.categorise', { queryParams: { currentTransactionGroup: 0 }});
  }
}
