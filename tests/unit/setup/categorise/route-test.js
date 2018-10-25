import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | setup/categorise', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:setup/categorise');
    assert.ok(route);
  });
});
