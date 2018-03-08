import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

export const slides = [
  'index',
  'impart-life'
];

Router.map(function() {
  slides.forEach(slide => {
    if (slide !== 'index') {
      this.route(slide);
    }
  });
});

export default Router;
