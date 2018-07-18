import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('adde-modal-header', 'Integration | Component | adde-modal-header', {
  integration: true,
});

test('adde-modal-header renders', function(assert) {
  assert.expect(1);

  // Template block usage:
  this.render(hbs`
    {{#adde-modal-header}}
      template block text
    {{/adde-modal-header}}
  `);

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text'
  );
});
