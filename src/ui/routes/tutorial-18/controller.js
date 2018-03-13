import Controller from '@ember/controller';
import { computed } from '@ember/object';

// BEGIN-SNIPPET tutorial-18
export default Controller.extend({
  favorites: computed('model.@each.favorite', function() {
    return this.model.filter(m => m.favorite);
  }),

  others: computed('model.@each.favorite', function() {
    return this.model.filter(m => !m.favorite);
  }),

  actions: {
    fav(mascot) {
      mascot.set('favorite', true);
    },
    unfav(mascot) {
      mascot.set('favorite', false);
    }
  }
});
// END-SNIPPET
