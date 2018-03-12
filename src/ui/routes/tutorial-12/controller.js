import Controller from '../tutorial-01/controller';
// BEGIN-SNIPPET tutorial-12
import move from 'ember-animated/motions/move';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import groupBy from 'lodash/groupBy';

export default Controller.extend({

  transition: function * ({ keptSprites,
                            removedSprites,
                            insertedSprites }) {

    yield Promise.all(removedSprites.map(fadeOut));

    keptSprites.forEach(sprite => {
      fadeIn(sprite);
      if (isMovingVertically(sprite)) {
        sprite.applyStyles({
          zIndex: 1
        });
      }
    });

    for (let row of groupIntoRows(keptSprites)) {
      if (offBottomOfScreen(row)) {
        break;
      }
      yield Promise.all(row.map(move));
    }

    insertedSprites.forEach(fadeIn);
  },

});

function isMovingVertically(sprite) {
  let change = sprite.initialBounds.top - sprite.finalBounds.top;
  return Math.abs(change) > 0.5;
}

function groupIntoRows(keptSprites) {
  return Object.values(
    groupBy(
      keptSprites,
      sprite => Math.floor(sprite.absoluteInitialBounds.top)
    )
  );
}

function offBottomOfScreen(row) {
  return row[0].absoluteInitialBounds.top > window.innerHeight &&
    row[0].absoluteFinalBounds.top > window.innerHeight;
}

// END-SNIPPET
