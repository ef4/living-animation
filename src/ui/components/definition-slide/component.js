import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { parallel } from 'ember-animated';
import { slideTransitionDuration } from "living-animation/src/router";

export default Component.extend({
  duration: slideTransitionDuration,
  transition: function * ({ sentSprites, removedSprites, duration }) {
    // When we're being sent away we `move` and `scale` to the new
    // place.  The `fadeIn` is here because we may have already been
    // fading away when we got interrupted and told to go somewhere
    // new
    sentSprites.forEach(parallel(move, scale, fadeIn));

    // When we're being removed, fade away. This uses half duration so
    // it matches the background slide transition, which fades out for
    // half the duration and then fades in for the second half.
    removedSprites.forEach(sprite => fadeOut(sprite, { duration: duration / 2 }));
  }
});
