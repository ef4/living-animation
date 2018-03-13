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
  this.route('tutorial-01');
  this.route('tutorial-02');
  this.route('tutorial-03');
  this.route('tutorial-03-1');
  this.route('tutorial-04');
  this.route('tutorial-05');
  this.route('tutorial-06');
  this.route('tutorial-07');
  this.route('tutorial-08');
  this.route('tutorial-11');
  this.route('tutorial-12');
  this.route('tutorial-13');
  this.route('no-cloning');
  this.route('tutorial-14');
  this.route('tutorial-15');
  this.route('tutorial-16');
  this.route('tutorial-17');
  this.route('nested');
  this.route('counter');
  this.route('tutorial-18');
  this.route('tutorial-19');
  this.route('tutorial-20');
  this.route('tutorial-21');
  this.route('tutorial-22');
  this.route('sprite-categories');
  this.route('tutorial-23', function() {
    this.route('detail', { path: '/:id' });
  });
  this.route('tutorial-24');
});

export default Router;

export const slideTransitionDuration = 800;

export const transitions = [
  { from: 'index', to: 'impart-life', use: fade },
  { from: 'impart-life', to: 'impart-life-with-code', use: toLeft, reverse: toRight },
  { from: 'title-with-code', to: 'impart-life-with-code', use: fade },
  { from: 'tutorial-23.index', to: 'tutorial-23.detail', use: toLeft, reverse: toRight },
];
