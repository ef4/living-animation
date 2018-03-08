import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { slides } from 'living-animation';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  slides.forEach(slide => {
    if (slide !== 'index') {
      this.route(slide);
    }
  });
});

export default Router;
