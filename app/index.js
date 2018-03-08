import fade from 'ember-animated/transitions/fade';

export const slideTransitionDuration = 800;

export const slides = [
  'index',
  'impart-life'
];

export const transitions = [
  { from: 'index', to: 'impart-life', use: fade }
];
