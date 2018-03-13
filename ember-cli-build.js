'use strict';

const CssImport = require('postcss-import');
const CssNext = require('postcss-cssnext');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function urls(...args){
  // I'm lazy loading this because it depends on async function
  // support in node, and it would be nice not to blow up on people
  // who are only running in dev. You only need this when doing a prod
  // build.
  let findURLs = require('./lib/urls');
  return findURLs(...args);
}

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    prember: {
      urls
    },
    snippetSearchPaths: ['src'],
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: CssImport },
          { module: CssNext }
        ]
      }
    }
  });

  app.import('node_modules/fullscreen-api-polyfill/fullscreen-api-polyfill.js', {
    using: [
      {
        transformation: 'fastbootShim'
      }
    ]
  });
  return app.toTree();
};
