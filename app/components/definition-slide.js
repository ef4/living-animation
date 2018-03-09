import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { fadeOut } from 'ember-animated/motions/opacity';
import { parallel } from 'ember-animated';
import { slideTransitionDuration } from 'living-animation';

export default Component.extend({
  duration: slideTransitionDuration,
  transition: function * ({ sentSprites, removedSprites }) {
    sentSprites.forEach(parallel(move, scale));
    removedSprites.forEach(fadeOut);
  }
});
