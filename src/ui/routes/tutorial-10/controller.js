import Controller from '../tutorial-01/controller';
// BEGIN-SNIPPET tutorial-10
import move from 'ember-animated/motions/move';
import linear from 'ember-animated/easings/linear';

export default Controller.extend({
  transition: function * ({ keptSprites,
                            insertedSprites,
                            removedSprites }) {
    keptSprites.forEach(sprite => move(sprite, {easing: linear }));
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, { easing: linear });
    });
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ x: window.innerWidth });
      move(sprite, { easing: linear });
    });
  }
});
// END-SNIPPET
