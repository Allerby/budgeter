import { classNames } from "@ember-decorators/component";
import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { easeCubicOut } from 'd3-ease';
import { timeout } from 'ember-concurrency';

/**
 *  Component parameters
 *  @param transactionGroups
 *  @param currentTransactionGroup
 */

@classNames('transaction-carousel')
export default class TransactionSlider extends Component {
  transactionGroups = null;

  *transition({ insertedSprites, removedSprites }) {
    for (let sprite of removedSprites) {
      fadeOut(sprite, { duration: 200 });
      sprite.endAtPixel({ y: sprite.initialBounds.bottom - 50 });
      move(sprite, { easing: easeCubicOut });
    }

    for (let sprite of insertedSprites) {
      yield timeout(100);
      fadeIn(sprite, { duration: 200 });
      sprite.startAtPixel({ y: sprite.finalBounds.top + 50 });
      move(sprite, { easing: easeCubicOut });
    }
  }
}
