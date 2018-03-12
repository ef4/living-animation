import fade from 'ember-animated/transitions/fade';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';
import EmberRouter from '@ember/routing/router';
import config from "../config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('impart-life');
  this.route('impart-life-with-code');
  this.route('title-with-code');
  this.route('affordances', function() {
    this.route('detail', { path: '/:id' });
  });
  this.route('mascots');
});

export default Router;

export const slideTransitionDuration = 800;

export const transitions = [
  { from: 'index', to: 'impart-life', use: fade },
  { from: 'impart-life', to: 'impart-life-with-code', use: toLeft, reverse: toRight },
  { from: 'title-with-code', to: 'impart-life-with-code', use: fade },
];
