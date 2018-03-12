import Controller from '../tutorial-01/controller';
// BEGIN-SNIPPET tutorial-04
import move from 'ember-animated/motions/move';

export default Controller.extend({
  transition: function * ({ keptSprites }) {
    keptSprites.forEach(move);
  }
});
// END-SNIPPET
