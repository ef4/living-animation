import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { parallel } from 'ember-animated';
import { slideTransitionDuration } from 'living-animation';

export default Component.extend({
  tagName: '',
  duration: slideTransitionDuration,
  transition: function * ({ sentSprites }) {
    sentSprites.forEach(
      parallel(
        move,
        adjustCSS.property('font-size'),
        adjustCSS.property('letter-spacing'),
        adjustColor.property('color')
      )
    );
  }
}).reopenClass({
  positionalParams: ['text']
});
