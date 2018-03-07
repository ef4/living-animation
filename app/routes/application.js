import Route from '@ember/routing/route';
import { inject } from '@ember/service';

const ENTER = 13;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

export default Route.extend({
  fastboot: inject(),
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
        this.nextSlide();
        break;
      case LEFT_ARROW:
        this.previousSlide();
        break;
      }
    });
  }
});
