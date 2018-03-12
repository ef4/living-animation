import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { animationsSettled } from 'ember-animated/test-support';

module('Integration | Component | moving-word', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      {{moving-word "hello" }}
    `);
    await animationsSettled();
    assert.equal(this.element.querySelector('span').textContent, 'hello');
  });
});
