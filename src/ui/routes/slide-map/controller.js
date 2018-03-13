import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import ENV from 'living-animation/config/environment';

export default Controller.extend({
  slides: computed(function(){
    return getOwner(this).lookup('route:application').slides.map(slide => ({
      url: ENV.rootURL + slide.replace(/^index$/, ''),
      name: slide
    }));
  })
});
