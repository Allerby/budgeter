import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | icon-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{icon-button}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#icon-button}}
        template block text
      {{/icon-button}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
