import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { slideTransitionDuration } from "living-animation/src/router";

export default Controller.extend({
  duration: slideTransitionDuration,

  transition: function * ({ sentSprites }) {
    sentSprites.forEach(sprite => {
      sprite.applyStyles({
        zIndex: 1
      });
      scale(sprite);
      move(sprite);
    });
  }
});
