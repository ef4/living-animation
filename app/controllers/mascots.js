import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeOut } from 'ember-animated/motions/opacity';
import { computed } from '@ember/object';

export default Controller.extend({
  transition: function * ({ keptSprites, removedSprites }) {
    yield Promise.all(removedSprites.map(fadeOut));
    keptSprites.forEach(move);
  },

  mascots: computed('model.@each.hidden', function() {
    return this.get('model').filter(m => !m.get('hidden'));
  }),

  actions: {
    hide(mascot) {
      mascot.set('hidden', true);
    }
  }
});
