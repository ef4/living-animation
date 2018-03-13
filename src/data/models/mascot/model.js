import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr(),
  imageURL: DS.attr(),
  introducedDate: DS.attr(),
  tags: DS.hasMany(),

  sortPriorityWithDefault: computed('sortPriority', 'id', function() {
    if (this.sortPriority != null) {
      return this.sortPriority;
    } else {
      return parseInt(this.id, 10);
    }
  })
});
