import Controller from '../tutorial-01/controller';
import move from 'ember-animated/motions/move';
import { sortBy } from 'lodash';
import { computed } from '@ember/object';
import { task, rAF } from 'ember-animated';
import drag from './-utils/drag';

export default Controller.extend({

  sortedMascots: computed('model.@each.sortPriority', function() {
    return sortBy(this.model.toArray(), m => m.sortPriorityWithDefault);
  }),

  beginDragging(mascot, event) {
    this.get('drag').perform(mascot, event);
  },

  drag: task(function * (mascot, event) {
    let dragState = {
      initialPointerX: event.x,
      initialPointerY: event.y,
      latestPointerX: event.x,
      latestPointerY: event.y
    };
    function stop() {
      mascot.set('dragState', null);
    }
    function update(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }
    window.addEventListener('mouseup', stop);
    window.addEventListener('mousemove', update);
    mascot.set('dragState', dragState);
    try {
      while (mascot.dragState) {
        yield rAF();
      }
    } finally {
      mascot.set('dragState', null);
      window.removeEventListener('mouseup', stop);
      window.addEventListener('mousemove', update);
    }
  }),

  transition: function * ({ keptSprites }) {
    let activeSprite = keptSprites.find(sprite => sprite.owner.value.dragState);
    let others = keptSprites.filter(sprite => sprite !== activeSprite);
    if (activeSprite) {
      drag(activeSprite, {
        others,
        onCollision(otherSprite) {
          let myModel = activeSprite.owner.value;
          let otherModel = otherSprite.owner.value;
          let myPriority = myModel.sortPriorityWithDefault;
          myModel.set('sortPriority', otherModel.sortPriorityWithDefault);
          otherModel.set('sortPriority', myPriority);
        }
      });
    }
    others.forEach(move);
  },

});
