import Route from '@ember/routing/route';

export default Route.extend({
  model({ id }) {
    return this.modelFor('affordances').find(model => model.id === id);
  }
});
