import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { slides } from 'living-animation';

const ENTER = 13;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

export default Route.extend({
  fastboot: inject(),
  router: inject(),

  beforeModel() {
    if (this.get('fastboot.isFastBoot')) {
      return;
    }
    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
      case ENTER:
        document.documentElement.requestFullscreen();
        break;
      case RIGHT_ARROW:
        this.stepSlide(1);
        break;
      case LEFT_ARROW:
        this.stepSlide(-1);
        break;
      }
    });
  },

  stepSlide(steps) {
    let currentIndex = slides.indexOf(this.get('router.currentRouteName'));
    if (currentIndex === -1) {
      currentIndex = 0;
    }
    this.transitionTo(slides[positiveMod(currentIndex + steps, slides.length)]);
  }
});

function positiveMod(q, d) {
  return (( q % d) + d) % d;
}
