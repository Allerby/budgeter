import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { wait } from 'ember-animated';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { parallel } from 'ember-animated';

/**
 *  Component parameters
 *  @param transactions
 *  @param currentTransactionGroup
 *  @param selectCategory
 */

export default Component.extend({
  classNames: 'transaction-carousel',
  transactions: null,
  
  transition: function * ({ insertedSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      wait(200);
      fadeIn(sprite);
      console.log('inserted', sprite);
    });

    removedSprites.forEach(sprite => {
      fadeOut(sprite);
      console.log('removed', sprite);
    });
  },
});
