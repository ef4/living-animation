import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  defaultAction() {
    if (this.onclick) {
      this.onclick();
    }
  }
});
