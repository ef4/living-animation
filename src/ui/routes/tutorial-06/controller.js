import Controller from '../tutorial-01/controller';
// BEGIN-SNIPPET tutorial-06
import move from 'ember-animated/motions/move';
import { easeOut } from 'ember-animated/easings/cosine';

export default Controller.extend({
  transition: function * ({ keptSprites, insertedSprites }) {
    keptSprites.forEach(move);
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, { easing: easeOut });
    });
  }
});
// END-SNIPPET
