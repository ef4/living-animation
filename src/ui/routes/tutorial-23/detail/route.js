import Route from '@ember/routing/route';

export default Route.extend({
  model({ id }) {
    return this.modelFor('tutorial-23').find(model => model.id === id);
  }
});
