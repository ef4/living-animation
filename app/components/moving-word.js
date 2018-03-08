import Component from '@ember/component';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { printSprites, parallel } from 'ember-animated';

export default Component.extend({
  tagName: '',
  transition: function * ({ sentSprites }) {
    printSprites(arguments[0]);
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
