import DS from 'ember-data';
import ENV from 'living-animation/config/environment';

export default DS.JSONAPISerializer.extend({
  normalize(modelClass, resourceHash) {
    let hash = this._super(modelClass, resourceHash);
    hash.data.attributes.imageURL = hash.data.attributes.imageURL.replace(/https:\/\/emberjs.com\/images\/tomsters(:?\/corp)?/, `${ENV.rootURL}images/mascots`);
    return hash;
  }
});
