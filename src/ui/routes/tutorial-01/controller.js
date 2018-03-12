import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  mascots: computed('model.@each.favorite', function() {
    return this.model.filter(m => m.favorite);
  }),

  actions: {
    favRandom() {
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
