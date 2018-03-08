import Component from '@ember/component';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';
import { printSprites } from 'ember-animated';
import { slideTransitionDuration } from 'living-animation';

export default Component.extend({
  duration: slideTransitionDuration,

  rules: function({ newItems, oldItems }) {
    let oldRoute = oldItems[oldItems.length - 1];
    let newRoute = newItems[newItems.length - 1];
    let oldRouteName, newRouteName;
    if (oldRoute) {
      oldRouteName = oldRoute.outlets.main.render.name;
    }
    if (newRoute) {
      newRouteName = newRoute.outlets.main.render.name;
    }
    console.log(`${oldRouteName} -> ${newRouteName}`);
    return function * ({ insertedSprites, keptSprites, removedSprites, duration }) {
      printSprites(arguments[0]);

      insertedSprites.forEach(sprite => {
        sprite.applyStyles({
          opacity: 0
        });
      });

      yield Promise.all(removedSprites.map(sprite => fadeOut(sprite, {
        duration: duration / 2
      })));

      insertedSprites.concat(keptSprites).forEach(sprite => fadeIn(sprite, {
        duration: duration / 2
      }));
    }
  }
});
