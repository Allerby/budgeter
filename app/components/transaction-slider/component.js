import { classNames } from "@ember-decorators/component";
import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

/**
 *  Component parameters
 *  @param transactionGroups
 *  @param currentTransactionGroup
 */

@classNames('transaction-carousel')
export default class TransactionSlider extends Component {
  transactionGroups = null;

  *transition({ insertedSprites, removedSprites }) {
    // Remember: Motions are promises.
    for (let sprite of insertedSprites) {
      fadeIn(sprite, { duration: 200 });
      sprite.applyStyles({ 'left': 0 });
      sprite.startAtPixel({ y: sprite.finalBounds.top + 20 });
      move(sprite, { easing: easeIn });
    }

    for (let sprite of removedSprites) {
      fadeOut(sprite);
      sprite.applyStyles({ 'left': 0 });
      sprite.endAtPixel({ y: sprite.initialBounds.height });
      move(sprite, { easing: easeOut });
    }
  }
}
