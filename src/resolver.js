import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';
import { merge } from '@ember/polyfills';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

merge(moduleConfig.types, {
  config: { definitiveCollection: 'main' },

  // this is needed because the fastboot ajax initializer does
  // "register('ajax:node')". It will eventually belong in
  // ember-cli-fastboot instead, once addons are able to extend the
  // custom types directly.
  ajax: { definitiveCollection: 'main' }
});
moduleConfig.collections.main.types.push('config');

// this is needed because the fastboot ajax initializer does
// "register('ajax:node')". It will eventually belong in
// ember-cli-fastboot instead, once addons are able to extend the
// custom types directly.
moduleConfig.collections.main.types.push('ajax');

export default Resolver.extend({
  config: moduleConfig
});
