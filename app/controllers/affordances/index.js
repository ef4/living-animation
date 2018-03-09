import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { easeIn, easeOut } from 'ember-animated/easings/cosine';
import { wait } from 'ember-animated';

export default Controller.extend({
  indexTransition: function * ({ sentSprites, receivedSprites, removedSprites, insertedSprites }) {
    let screenBounds = document.documentElement.getBoundingClientRect();
    let motionCenterX, motionCenterY;

    sentSprites.forEach(sprite => {
      motionCenterX = sprite.absoluteInitialBounds.left + sprite.absoluteInitialBounds.width / 2;
      motionCenterY = sprite.absoluteInitialBounds.top + sprite.absoluteInitialBounds.height / 2;
      arguments[0].onMotionStart(sprite);
    })

    let distances = new Map();

    removedSprites.forEach(sprite => {
      let centerX = sprite.absoluteInitialBounds.left + sprite.absoluteInitialBounds.width / 2;
      let centerY = sprite.absoluteInitialBounds.top + sprite.absoluteInitialBounds.height / 2;

      let dx = centerX - motionCenterX;
      let dy = centerY - motionCenterY;

      let distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
      let magnify = 2 * screenBounds.width / distanceFromCenter;

      // our sprite's center and the screen's center form a line. We
      // want to aim for a place along that line far offscreen.
      sprite.endAtPixel({ x: magnify * dx,  y: magnify * dy });
      distances.set(sprite, distanceFromCenter);
      arguments[0].onMotionStart(sprite);
    });

    removedSprites.sort((a,b) => distances.get(b) - distances.get(a));
    for (let sprite of removedSprites) {
      move(sprite, { easing: easeIn });
      yield wait(25);
    }

    sentSprites.concat(receivedSprites).forEach(sprite => {
      sprite.applyStyles({
        zIndex: 1
      });
      move(sprite);
      scale(sprite);
    });

    receivedSprites.forEach(sprite => {
      motionCenterX = sprite.absoluteFinalBounds.left + sprite.absoluteFinalBounds.width / 2;
      motionCenterY = sprite.absoluteFinalBounds.top + sprite.absoluteFinalBounds.height / 2;
    })


    distances = new Map();

    insertedSprites.forEach(sprite => {
      let centerX = sprite.absoluteFinalBounds.left + sprite.absoluteFinalBounds.width / 2;
      let centerY = sprite.absoluteFinalBounds.top + sprite.absoluteFinalBounds.height / 2;

      let dx = centerX - motionCenterX;
      let dy = centerY - motionCenterY;

      let distanceFromCenter = Math.sqrt(dx*dx + dy*dy);
      let magnify = 2 * screenBounds.width / distanceFromCenter;

      // our sprite's center and the screen's center form a line. We
      // want to aim for a place along that line far offscreen.
      sprite.startAtPixel({ x: magnify * dx,  y: magnify * dy });

      distances.set(sprite, distanceFromCenter);
    });

    insertedSprites.sort((a,b) => distances.get(a) - distances.get(b));
    for (let sprite of insertedSprites) {
      move(sprite, { easing: easeOut });
      yield wait(25);
    }
  }
});
