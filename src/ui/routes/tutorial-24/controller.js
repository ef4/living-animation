import Controller from '../tutorial-01/controller';
import move from 'ember-animated/motions/move';
import { sortBy } from 'lodash';
import { computed } from '@ember/object';
import drag, {
  chooseNextToLeft,
  chooseNextToRight,
  chooseNextToUp,
  chooseNextToDown,
  makeTarget
} from './-utils/drag';

const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const SPACE = 32;

export default Controller.extend({

  sortedMascots: computed('model.@each.sortPriority', function() {
    return sortBy(this.model.toArray(), m => m.sortPriorityWithDefault);
  }),

  activateKeyboardNav() {
    document.querySelector('.mascots .mascot-card').focus();
  },

  handleKey(mascot, event) {
    let activeMascot = this.model.find(mascot => mascot.dragState);

    if (activeMascot) {
      let xStep = 0;
      let yStep = 0;
      switch (event.keyCode) {
      case RIGHT_ARROW:
        xStep = 1;
        break;
      case LEFT_ARROW:
        xStep = -1;
        break;
      case DOWN_ARROW:
        yStep = 1;
        break;
      case UP_ARROW:
        yStep = -1;
        break;
      case SPACE:
        activeMascot.set('dragState', null);
        event.stopPropagation();
        return false;
      }
      if (xStep || yStep) {
        activeMascot.dragState.xStep += xStep;
        activeMascot.dragState.yStep += yStep;
        event.stopPropagation();
        return false;
      }
    } else {
      let elements = [...document.querySelectorAll('.mascots .mascot-card')].filter(element => element !== event.target);
      let targets = [...elements].map(element => makeTarget(element.getBoundingClientRect(), element));
      let currentTarget = makeTarget(event.target.getBoundingClientRect(), event.target);
      let nextTarget;

      switch (event.keyCode) {
      case RIGHT_ARROW:
        nextTarget = chooseNextToRight(currentTarget, targets);
        break;
      case LEFT_ARROW:
        nextTarget = chooseNextToLeft(currentTarget, targets);
        break;
      case DOWN_ARROW:
        nextTarget = chooseNextToDown(currentTarget, targets);
        break;
      case UP_ARROW:
        nextTarget = chooseNextToUp(currentTarget, targets);
        break;
      case SPACE:
        this.beginDragging(mascot, event);
        event.stopPropagation();
        return false;
      }
      if (nextTarget) {
        nextTarget.payload.focus();
        event.stopPropagation();
        return false;
      }
    }
  },

  beginDragging(mascot, event) {
    let dragState;

    function stopMouse() {
      mascot.set('dragState', null);
      window.removeEventListener('mouseup', stopMouse);
      window.removeEventListener('mousemove', updateMouse);
    }

    function updateMouse(event) {
      dragState.latestPointerX = event.x;
      dragState.latestPointerY = event.y;
    }

    if (event instanceof KeyboardEvent) {
      // This is a keyboard-controlled "drag" instead of a real mouse
      // drag.
      dragState = {
        usingKeyboard: true,
        xStep: 0,
        yStep: 0,
      };
    } else {
      dragState = {
        usingKeyboard: false,
        initialPointerX: event.x,
        initialPointerY: event.y,
        latestPointerX: event.x,
        latestPointerY: event.y
      };
      window.addEventListener('mouseup', stopMouse);
      window.addEventListener('mousemove', updateMouse);
    }
    mascot.set('dragState', dragState);
  },

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

function positiveMod(q, d) {
  return (( q % d) + d) % d;
}
