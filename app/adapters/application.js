import DS from 'ember-data';
import ENV from 'living-animation/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.rootURL,
  namespace: '/api'
});
