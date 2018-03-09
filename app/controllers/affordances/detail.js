import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';

export default Controller.extend({
  detailTransition: function * ({ receivedSprites }) {
    receivedSprites.forEach(sprite => {
      sprite.applyStyles({
        zIndex: 1
      });
      move(sprite);
      scale(sprite);
    });
  }
});
