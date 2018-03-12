import { A } from '@ember/array';
import Component from '@ember/component';
import move from 'ember-animated/motions/move';

export default Component.extend({
  init() {
    this._super();
    this.set('collections', A([
      {
        title: 'A',
        members: A([
          { name: 'one' },
          { name: 'two' },
          { name: 'three' }
        ])
      },
      {
        title: 'B',
        members: A([
          { name: 'four' },
          { name: 'five' },
          { name: 'six' }
        ])
      }
    ]));
  },

  transition: function * ({ insertedSprites, keptSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ x: window.outerWidth });
      move(sprite);
    });

    keptSprites.forEach(move);

    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ x: window.outerWidth });
      move(sprite);
    });
  },


  actions: {
    addMember(collection) {
      collection.members.unshiftObject({
        name: String(counter++)
      });
    },
    addMembers() {
      this.get('collections').forEach(collection => {
        collection.members.unshiftObject({
          name: String(counter++)
        });
      });
    },
    addCollection() {
      this.get('collections').unshiftObject({
        title: String(counter++),
        members: A()
      });
    }
  }
});

let counter = 0;
