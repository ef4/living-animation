import fade from 'ember-animated/transitions/fade';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';

export const slideTransitionDuration = 800;

export const slides = [
  'index',
  'impart-life',
  'impart-life-with-code',
  'title-with-code',
  'formats',
];

export const transitions = [
  { from: 'index', to: 'impart-life', use: fade },
  { from: 'impart-life', to: 'impart-life-with-code', use: toLeft, reverse: toRight },
  { from: 'title-with-code', to: 'impart-life-with-code', use: fade },

];
