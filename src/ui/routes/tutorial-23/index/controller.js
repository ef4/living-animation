import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { slideTransitionDuration } from "living-animation/src/router";
import scale from 'ember-animated/motions/scale';

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
  },

  actions: {
    visit(mascot) {
      this.transitionToRoute('tutorial-23.detail', mascot);
    }
  }
});
