import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'living-animation/config/environment';

export default Controller.extend({
  imageURL: computed(function() {
    return `${ENV.rootURL}images/theclonewarsposter.jpg`;
  })
});
