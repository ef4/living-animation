import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: 'edge-tray',
  classNameBindings: ['isOpen'],
  isOpen: computed(function() {
    return typeof FastBoot === 'undefined' && !!localStorage.getItem('edge-tray-open');
  }),
  actions: {
    toggle() {
      if (this.isOpen) {
        localStorage.removeItem('edge-tray-open');
      } else {
        localStorage.setItem('edge-tray-open', true);
      }
      this.notifyPropertyChange('isOpen');
    }
  }
});
