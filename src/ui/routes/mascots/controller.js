import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut } from 'ember-animated/motions/opacity';
import { computed } from '@ember/object';
import groupBy from 'lodash/groupBy';

export default Controller.extend({
  transition: function * ({ keptSprites, removedSprites }) {
    // if *everything* is leaving, we're just done with our page and
    // don't want to animate anything
    if (keptSprites.length === 0) {
      return;
    }

    yield Promise.all(removedSprites.map(sprite => fadeOut(sprite, { duration: 200 })));

    keptSprites.forEach(sprite => {
      // if the sprite is going to move vertically by more than half a pixel
      if (Math.abs(sprite.initialBounds.top - sprite.finalBounds.top) > 0.5) {
        sprite.applyStyles({
          zIndex: 1
        });
      }
    });

    let rows = Object.values(groupBy(keptSprites, sprite => Math.floor(sprite.absoluteInitialBounds.top / 10)));
    for (let row of rows) {
      if (row[0].absoluteInitialBounds.top > window.innerHeight && row[0].absoluteFinalBounds.top > window.innerHeight) {
        // if we get down to rows that are off the bottom of the
        // screen, stop animating, because we can't see them anyway
        break;
      }
      yield Promise.all(row.map(sprite => move(sprite, { duration: 200 })));
    }
  },

  mascots: computed('model.@each.hidden', function() {
    return this.model.filter(m => !m.hidden);
  }),

  actions: {
    hide(mascot) {
      mascot.set('hidden', true);
    }
  }
});
