import fade from 'ember-animated/transitions/fade';

export const slideTransitionDuration = 800;

export const slides = [
  'index',
  'impart-life',
  'snippet',
  'formats',
];

export const transitions = [
  { from: 'index', to: 'impart-life', use: fade }
];
