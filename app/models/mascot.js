import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  imageURL: DS.attr(),
  introducedDate: DS.attr(),
  tags: DS.hasMany()
});
