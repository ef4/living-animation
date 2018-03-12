import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import RouteMap from "living-animation/src/router";

const ENTER = 13;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default Route.extend({
  fastboot: inject(),
  router: inject(),

  beforeModel() {
    if (this.fastboot.isFastBoot) {
      return;
    }
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
      case ENTER:
        document.documentElement.requestFullscreen();
        break;
      case RIGHT_ARROW:
        if (this.isChildSlide()) {
          this.toParentSlide();
        } else {
          this.stepSlide(1);
        }
        break;
      case LEFT_ARROW:
        if (this.isChildSlide()) {
          this.toParentSlide();
        } else {
          this.stepSlide(-1);
        }
        break;
      }
    });
  },

  stepSlide(steps) {
    let slides = this.slides;
    let currentIndex = slides.indexOf(this.router.currentRouteName.split('.')[0]);
    if (currentIndex === -1) {
      currentIndex = 0;
    }
    this.transitionTo(slides[positiveMod(currentIndex + steps, slides.length)]);
  },

  isChildSlide() {
    let parts = this.router.currentRouteName.split('.');
    return parts.length > 1 && parts[1] !== 'index';
  },

  toParentSlide() {
    let parts = this.router.currentRouteName.split('.');
    if (parts.length > 1) {
      this.transitionTo(parts[0] + '.index');
    }
  },

  /*
     This is a convenient hack, it works for me because I'm only using
     a limited subset of the router dsl. By convention, each of the
     top-level routes (meaning the direct children of `application`)
     is a slide, and we navigate forward and back through them.
   */
  slides: computed(function() {
    let routes = ['index'];
    RouteMap.dslCallbacks.forEach(callback => {
      callback.call({ route: function(name){ routes.push(name); } });
    });
    return routes;
  })
});

function positiveMod(q, d) {
  return (( q % d) + d) % d;
}
