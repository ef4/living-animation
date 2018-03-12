import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { computed } from '@ember/object';
import { easeOut } from 'ember-animated/easings/cosine';

export default Controller.extend({
  transition: function * ({ keptSprites, insertedSprites }) {
    keptSprites.forEach(move);
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.innerWidth });
      move(sprite, { easing: easeOut });
    });
  },

  mascots: computed('model.@each.favorite', function() {
    return this.model.filter(m => m.favorite);
  }),

  actions: {
    addRandom() {
      let notYetChosen = this.model.filter(m => !m.favorite);
      if (notYetChosen.length === 0) {
        return;
      }
      let newChosen = notYetChosen[Math.floor(Math.random() * notYetChosen.length)];
      newChosen.set('favorite', true);
    },
    unfav(mascot) {
      mascot.set('favorite', false);
    }
  }
});
