// BEGIN-SNIPPET test-example
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  setupAnimationTest,
  animationsSettled,
  bounds,
  time
} from 'ember-animated/test-support';

module('Integration | Component | moving-word', function(hooks) {
  setupRenderingTest(hooks);
  setupAnimationTest(hooks);

  test('it leaves an animated orphan', async function(assert) {
    await render(hbs`
      <div class="orphans" style="position:fixed">{{animated-orphans}}</div>
      <div class="top">
        This is the top area
        {{#if showInTop}}
          {{moving-word "hello" }}
        {{/if}}
      </div>
      <div class="bottom">
        This is the bottom area
        {{#unless showInTop}}
          {{moving-word "hello" }}
        {{/unless}}
      </div>
    `);

    let startingBounds = bounds(this.element.querySelector('.bottom span'));
    time.pause();
    this.set('showInTop', true);
    await settled();
    await time.advance(10);
    assert.closeBounds(5, bounds(this.element.querySelector('.orphans span')), startingBounds);
    time.runAtSpeed(40);
    await animationsSettled();
    assert.equal(this.element.querySelector('.top span').textContent, 'hello');
  });
// END-SNIPPET
  test('it renders', async function(assert) {
    await render(hbs`
      {{moving-word "hello" }}
    `);
    assert.equal(this.element.querySelector('span').textContent, 'hello');
  });


});
