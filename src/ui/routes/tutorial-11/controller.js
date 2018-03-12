import Controller from '../tutorial-01/controller';
// BEGIN-SNIPPET tutorial-11
import move from 'ember-animated/motions/move';
import { easeOut, easeIn } from 'ember-animated/easings/cosine';

export default Controller.extend({
  transition: function * ({ keptSprites,
                            insertedSprites,
                            removedSprites }) {
    keptSprites.forEach(move);
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, { easing: easeOut });
    });
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ x: window.innerWidth });
      move(sprite, { easing: easeIn });
    });
  }
});
// END-SNIPPET
