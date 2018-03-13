import Controller from '../tutorial-18/controller';
import move from 'ember-animated/motions/move';

// BEGIN-SNIPPET tutorial-21
export default Controller.extend({
  transition: function * ({ keptSprites,
                            receivedSprites }) {
    keptSprites.forEach(move);
    receivedSprites.forEach(move);
  }
});
// END-SNIPPET
